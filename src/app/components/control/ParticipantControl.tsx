import classNames from 'classnames'
import {
  flow, get, identity, LodashIdentity, LodashUpdate1x3, set, subtract, update, __,
} from 'lodash/fp'
import React, { useState } from 'react'
import { isActiveTurn, numberToDNDModifier } from '../../functions'
import {
  Character, InitiativeParticipant, ParticipantTurn, Turn,
} from '../../types'
import { Avatar } from '../display/Avatar'
import { NumberInput } from '../form'

export interface ParticipantControlProps {
  character: Character,
  name: string,
  onDelete: () => void,
  onUpdate: (participant: InitiativeParticipant) => void,
  participant: InitiativeParticipant,
  participantTurn: ParticipantTurn,
  turn: Turn,
}

export const ParticipantControl = ({
  character,
  name,
  onDelete,
  onUpdate,
  participant,
  participantTurn,
  turn,
}: ParticipantControlProps): JSX.Element => {
  const [modifyHealth, setModifyHealth] = useState<number | ''>('')

  const isActive = isActiveTurn(turn)
  const modifyIsNumber = typeof modifyHealth === 'number' && modifyHealth !== 0
  const isDead = participant.status.dead
  const avatarUrl = participant.show.status
    ? character.avatar.smallURL : character.player.discordURL

  const setPath = <V extends unknown>(path: string) => (value: V) => onUpdate(
    set(path, value, participant),
  )

  const handleHealthModification = (updatedParticipant: InitiativeParticipant): void => {
    setModifyHealth('')

    onUpdate(flow(
      set('status.unconscious', updatedParticipant.health.current === 0),
      set('status.dead', false),
    )(updatedParticipant))
  }

  // Adds to health, capped at max
  const onHeal = () => {
    const modifiedHealth = Math.min(
      participant.health.max,
      participant.health.current + (modifyHealth || 0),
    )

    handleHealthModification(set('health.current', modifiedHealth, participant))
  }

  // Removes temp HP, then health, capped at 0
  const onDamage = () => {
    let damage = modifyHealth || 0
    if (!damage) return handleHealthModification(participant)

    let modifyTemp: LodashIdentity | LodashUpdate1x3 = identity
    let modifyCurrent: LodashIdentity | LodashUpdate1x3 = identity

    if (participant.health.temp) {
      const reduction = Math.min(participant.health.temp, damage)
      damage -= reduction
      modifyTemp = update('temp', subtract(__, reduction))
    }

    if (damage) {
      modifyCurrent = set(
        'current',
        Math.max(0, participant.health.current - damage),
      )
    }

    return handleHealthModification(update(
      'health',
      flow(
        modifyTemp,
        modifyCurrent,
      ),
      participant,
    ))
  }

  // Replaces temp, makes no other changes
  const onSetTemp = () => handleHealthModification(
    set('health.temp', modifyHealth, participant),
  )

  const onToggleDead = () => {
    const updatedParticipant = flow(
      set('status.dead', !participant.status.dead),
      participant.status.dead ? set('health.current', 1) : identity,
    )(participant)

    onUpdate(updatedParticipant)
  }

  const onToggleShowDetails = () => onUpdate(set(
    'show.details', !participant.show.details, participant,
  ))

  // TODO Currently using a free variable as a quick fix. Needs its own variable.
  const onToggleShowRealName = () => onUpdate(set(
    'show.status', !participant.show.status, participant,
  ))

  const renderHitPoints = (ptp: InitiativeParticipant): string => {
    const { current, max, temp } = ptp.health
    const tempDisplay = temp > 0 ? ` (${temp})` : ''

    return `${current} / ${max}${tempDisplay}`
  }

  const renderSimpleNumberInput = (path: string, skipTab = true) => (
    <NumberInput
      onChange={setPath<number>(path)}
      skipTab={skipTab}
      value={get(path, participant)}
    />
  )

  return (
    <div className="card participant-control">
      {/* Header */}
      <div className={classNames('card-header', {
        'turn-active': participantTurn === 'active',
        'turn-next-player': participantTurn === 'nextPlayer',
      })}
      >
        {avatarUrl && (
        <div className="participant-control__avatar">
          <Avatar
            size={48}
            url={avatarUrl}
            backgroundGradientColours={character.avatar.gradientColours}
          />
        </div>
        )}
        <h1>{name}</h1>
        <div className="participant-control__card-controls">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              defaultChecked={participant.show.status}
              onClick={onToggleShowRealName}
              tabIndex={-1}
              type="checkbox"
            />
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              defaultChecked={participant.show.details}
              onClick={onToggleShowDetails}
              tabIndex={-1}
              type="checkbox"
            />
          </div>
          {!isActive && (
            <button
              className="btn btn-sm btn-danger"
              onClick={onDelete}
              tabIndex={-1}
              type="button"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        {/* Inactive Turn */}
        {!isActive && (
          <>
            <div className="row mb-3">
              <div className="col">Initiative</div>
              <div className="col">Current HP</div>
              <div className="col">Max HP</div>
              <div className="col">Temp HP</div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <NumberInput
                  onChange={setPath<number>('initiative')}
                  placeholder={numberToDNDModifier(character.initiative.bonus)}
                  value={participant.initiative || ''}
                />
              </div>
              <div className="col">
                {renderSimpleNumberInput('health.current')}
              </div>
              <div className="col">
                {renderSimpleNumberInput('health.max')}
              </div>
              <div className="col">
                {renderSimpleNumberInput('health.temp')}
              </div>
            </div>
          </>
        )}

        {/* Active Turn */}
        {isActive && (
          <>
            <div className="row mb-3">
              <div className="col">HP</div>
              <div className="col">
                <button
                  className="btn btn-outline-success"
                  disabled={!modifyIsNumber}
                  onClick={onHeal}
                  type="button"
                >
                  Heal
                </button>
              </div>
              <div className="col">
                {participant.health.current === 0 ? (
                  <button
                    className={classNames('btn', {
                      'btn-outline-dark': !isDead,
                      'btn-dark': isDead,
                    })}
                    onClick={onToggleDead}
                    type="button"
                  >
                    {isDead ? 'Dead' : 'Alive'}
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-danger"
                    disabled={!modifyIsNumber}
                    onClick={onDamage}
                    type="button"
                  >
                    Damage
                  </button>
                )}
              </div>
              <div className="col">Initiative</div>
            </div>
            <div className="row mb-3">
              <div className="col hit-points">{renderHitPoints(participant)}</div>
              <div className="col">
                <NumberInput onChange={setModifyHealth} value={modifyHealth} />
              </div>
              <div className="col">
                <button
                  className="btn btn-outline-info"
                  disabled={!modifyIsNumber}
                  onClick={onSetTemp}
                  type="button"
                >
                  Temp HP
                </button>
              </div>
              <div className="col">
                {renderSimpleNumberInput('initiative')}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
