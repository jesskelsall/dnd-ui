import classNames from 'classnames'
import {
  get, isEqual, set, sortBy,
} from 'lodash/fp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EMPTY_CHOICE, INITIATIVE_TOWER_TEMPLATE } from '../../../consts'
import { getParticipantName, isActiveTurn } from '../../../functions'
import {
  advanceTurn,
  createParticipant,
  deleteParticipant,
  resetInitiativeTower,
  setTimer,
  updateParticipant,
} from '../../../reducers'
import {
  selectCharacters,
  selectCharactersList,
  selectControlData,
  selectInitiativeHasParticipants,
  selectInitiativeParticipants,
  selectInitiativeTower,
  selectInitiativeTurn,
} from '../../../selectors'
import { Choice } from '../../../types'
import { Dropdown, NumberInput } from '../../form'
import { ParticipantControl } from '../ParticipantControl'

export const InitiativeTowerPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const data = useSelector(selectControlData)
  const characters = selectCharacters(data)
  const charactersList = selectCharactersList(data)
  const hasParticipants = selectInitiativeHasParticipants(data)
  const initiativeParticipants = selectInitiativeParticipants(data)
  const initiativeTower = selectInitiativeTower(data)
  const turn = selectInitiativeTurn(data)

  const isDefaultState = isEqual(initiativeTower, INITIATIVE_TOWER_TEMPLATE)

  const addCharacters: Choice[] = charactersList.map((character) => ({
    label: character.names.real.name,
    value: character.id,
  }))

  const isActive = isActiveTurn(turn)
  const sortedParticipants = isActive
    ? initiativeParticipants
    : sortBy(
      [
        (participant) => !characters[participant.characterId].player.name.name,
        (participant) => characters[participant.characterId].names.real.name,
      ],
      initiativeParticipants,
    )

  const renderTimerNumberInput = (path: string) => (
    <NumberInput
      onChange={(value) => dispatch(setTimer(
        set(path, value, initiativeTower.timer),
      ))}
      value={get(path, initiativeTower.timer)}
    />
  )

  return (
    <div className="page initiative-tower">
      {/* Tertiary Navbar */}
      <div className="navbar navbar-tertiary">
        <div className="navbar-center d-grid gap-2 d-md-flex">

          {/* Add Character */}
          <label className="col-sm-2 col-form-label">Add Character</label>
          <div className="col">
            <Dropdown
              options={[EMPTY_CHOICE, ...addCharacters]}
              onChange={(characterId) => dispatch(createParticipant(characterId))}
              value=""
            />
          </div>

          {/* Buttons */}
          <button
            className="btn btn-primary"
            disabled={!hasParticipants}
            onClick={() => dispatch(advanceTurn())}
            type="button"
          >
            {isActive ? 'Next' : 'Start'}
          </button>
          <button
            className={classNames('btn', {
              'btn-danger': !isDefaultState,
              'btn-outline-danger': isDefaultState,
            })}
            disabled={isDefaultState}
            onClick={() => dispatch(resetInitiativeTower())}
            type="button"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="page page-scroll participants">
        <div className="section">
          {/* Timer */}
          {!isActive && (
            <div className="card participant-control">
              <div className="card-header">
                <h1>Timer</h1>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Each Round</label>
                  <div className="col">
                    {renderTimerNumberInput('betweenRounds')}
                  </div>
                  <label className="col-sm-2 col-form-label">Each Turn</label>
                  <div className="col">
                    {renderTimerNumberInput('eachTurn')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Participants */}
          {sortedParticipants.map((participant) => {
            const character = characters[participant.characterId]

            return (
              <ParticipantControl
                character={character}
                name={getParticipantName(participant, character, sortedParticipants)}
                key={participant.id}
                onDelete={() => dispatch(deleteParticipant(participant.id))}
                onUpdate={(updatedParticipant) => dispatch(updateParticipant(updatedParticipant))}
                participant={participant}
                participantTurn={isActive && participant.initiative === turn.initiative ? 'active' : 'inactive'}
                turn={turn}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
