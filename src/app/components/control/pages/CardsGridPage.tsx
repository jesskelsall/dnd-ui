import {
  get,
  set, startCase, uniq, update,
} from 'lodash/fp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EMPTY_CHOICE, LINE_TRANSFORMERS } from '../../../consts'
import {
  addGridCard, deleteGridCard, setGridCard, setGridDetails,
} from '../../../reducers'
import {
  selectCardsGrid, selectCharacters, selectCharactersList, selectControlData,
} from '../../../selectors'
import {
  AvatarType, Choice, GridCard, Line,
} from '../../../types'
import { Avatar } from '../../display/Avatar'
import { Dropdown } from '../../form'

const lines: Choice<Line>[] = Object.keys(LINE_TRANSFORMERS).map((line) => ({
  label: startCase(line),
  value: line as Line,
}))

const avatarTypes: Choice<AvatarType>[] = ['none', 'character', 'player'].map((type) => ({
  label: startCase(type),
  value: type as AvatarType,
}))

export const CardsGridPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const data = useSelector(selectControlData)
  const cardsGrid = selectCardsGrid(data)
  const characters = selectCharacters(data)
  const charactersList = selectCharactersList(data)

  const cardsGridCharacterIds: string[] = uniq(cardsGrid.cards.map((card) => card.characterId))

  const addCharacters: Choice[] = charactersList
    .filter((character) => !cardsGridCharacterIds.includes(character.id))
    .map((character) => ({
      label: character.names.real.name,
      value: character.id,
    }))

  // const [primary, setPrimary] = useState<Line>('realName')
  // const [secondary, setSecondary] = useState<Line>('raceAndClasses')
  // const [tertiary, setTertiary] = useState<Line>('pronouns')

  const setDetailsPath = <V extends unknown = Line>(path: string) => (value: V) => dispatch(
    setGridDetails(set(path, value, cardsGrid.details)),
  )

  const renderLineDropdown = (path: string) => (
    <Dropdown<Line>
      onChange={setDetailsPath(path)}
      options={lines}
      value={get(path, cardsGrid.details)}
    />
  )

  const onToggleCardVisibility = (card: GridCard) => () => {
    const updatedCard = update('visible', (visible: boolean) => !visible, card)
    dispatch(setGridCard(updatedCard))
  }

  return (
    <div className="page cards-grid-page">
      {/* Tertiary Navbar */}
      <div className="navbar navbar-tertiary">
        <div className="navbar-center d-grid gap-2 d-md-flex">
          <label className="col-sm-2 col-form-label">Add Character</label>
          <div className="col">
            <Dropdown
              options={[EMPTY_CHOICE, ...addCharacters]}
              onChange={(characterId) => dispatch(addGridCard(characterId))}
              value=""
            />
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="page page-scroll">
        <div className="section">
          <h1>Details</h1>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Primary</label>
            <div className="col">
              {renderLineDropdown('primary')}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Secondary</label>
            <div className="col">
              {renderLineDropdown('secondary')}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Tertiary</label>
            <div className="col">
              {renderLineDropdown('tertiary')}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Avatar</label>
            <div className="col">
              <Dropdown<AvatarType>
                options={avatarTypes}
                onChange={setDetailsPath('avatar')}
                value={cardsGrid.details.avatar}
              />
            </div>
          </div>
        </div>

        {/* Grid Cards */}
        <div className="section cards">
          {cardsGrid.cards.map((card) => {
            const character = characters[card.characterId]

            return (
              <div className="card participant-control" key={card.characterId}>
                <div className="card-header">
                  {character.avatar.smallURL && (
                  <div className="participant-control__avatar">
                    <Avatar
                      size={48}
                      url={character.avatar.smallURL}
                      backgroundGradientColours={character.avatar.gradientColours}
                    />
                  </div>
                  )}
                  <h1>{character?.names.real.name}</h1>
                  <div className="participant-control__card-controls">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        defaultChecked={card.visible}
                        onChange={onToggleCardVisibility(card)}
                        type="checkbox"
                      />
                    </div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => dispatch(deleteGridCard(card.characterId))}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
