import classNames from 'classnames'
import {
  clamp, flow, get, identity, set,
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

  const setPath = <V extends unknown>(path: string) => (value: V) => onUpdate(
    set(path, value, participant),
  )

  const onModifyHealth = (direction: -1 | 1) => () => {
    const amount = (modifyHealth || 0) * direction
    const modifiedHealth = clamp(
      0,
      participant.health.max,
      participant.health.current + amount,
    )

    const updatedParticipant = flow(
      set('health.current', modifiedHealth),
      set('status.unconscious', modifiedHealth === 0),
      set('status.dead', false),
    )(participant)

    setModifyHealth('')
    onUpdate(updatedParticipant)
  }

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
        {character.avatar.smallURL && (
        <div className="participant-control__avatar">
          <Avatar
            size={48}
            url={character.avatar.smallURL}
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
              {participant.health.current === 0 ? (
                <div className="col">
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
                </div>
              ) : (
                <div className="col hit-points">
                  {participant.health.current}
                  {' / '}
                  {participant.health.max}
                </div>
              )}
              <div className="col">Temp HP</div>
              <div className="col">Modify</div>
              <div className="col">
                <button
                  className="btn btn-outline-success"
                  disabled={!modifyIsNumber}
                  onClick={onModifyHealth(1)}
                  type="button"
                >
                  Heal
                </button>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                {renderSimpleNumberInput('initiative')}
              </div>
              <div className="col">
                {renderSimpleNumberInput('health.temp')}
              </div>
              <div className="col">
                <NumberInput onChange={setModifyHealth} value={modifyHealth} />
              </div>
              <div className="col">
                <button
                  className="btn btn-outline-danger"
                  disabled={!modifyIsNumber}
                  onClick={onModifyHealth(-1)}
                  type="button"
                >
                  Damage
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
