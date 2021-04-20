import classNames from 'classnames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EMPTY_CHOICE, INITIATIVE_TOWER_TEMPLATE } from '../../../consts'
import { advanceTurn, createParticipant, resetInitiativeTower } from '../../../reducers'
import {
  selectCharacters,
  selectCharactersList,
  selectControlData,
  selectInitiativeHasParticipants,
  selectInitiativeIsActive,
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
  const isActive = selectInitiativeIsActive(data)
  const turn = selectInitiativeTurn(data)

  const isDefaultState = initiativeTower === INITIATIVE_TOWER_TEMPLATE

  const addCharacters: Choice[] = charactersList.map((character) => ({
    label: character.names.real.name,
    value: character.id,
  }))

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
          {initiativeParticipants.map((participant) => (
            <ParticipantControl
              character={characters[participant.characterId]}
              key={participant.id}
              participant={participant}
              turn={turn}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
