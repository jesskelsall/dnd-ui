import classNames from 'classnames'
import {
  isEqual, sortBy, uniq,
} from 'lodash/fp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EMPTY_CHOICE, INITIATIVE_TOWER_TEMPLATE } from '../../../consts'
import { isActiveTurn } from '../../../functions'
import {
  advanceTurn, createParticipant, deleteParticipant, resetInitiativeTower, updateParticipant,
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
import { Dropdown } from '../../form'
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

  const initiativeParticipantCharacterIds: string[] = uniq(
    initiativeParticipants.map((participant) => participant.characterId),
  )

  const addCharacters: Choice[] = charactersList
    .filter((character) => !initiativeParticipantCharacterIds.includes(character.id))
    .map((character) => ({
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

  return (
    <div className="page initiative-tower">
      {/* Tertiary Navbar */}
      <div className="navbar navbar-tertiary">
        <div className="navbar-center d-grid gap-2 d-md-flex">

          {/* Add Character */}
          {!isActive && (
            <>
              <label className="col-sm-2 col-form-label">Add Character</label>
              <div className="col">
                <Dropdown
                  options={[EMPTY_CHOICE, ...addCharacters]}
                  onChange={(characterId) => dispatch(createParticipant(characterId))}
                  value=""
                />
              </div>
            </>
          )}

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
          {sortedParticipants.map((participant) => (
            <ParticipantControl
              character={characters[participant.characterId]}
              key={participant.id}
              onDelete={() => dispatch(deleteParticipant(participant.id))}
              onUpdate={(updatedParticipant) => dispatch(updateParticipant(updatedParticipant))}
              participant={participant}
              participantTurn={isActive && participant.initiative === turn.initiative ? 'active' : 'inactive'}
              turn={turn}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
