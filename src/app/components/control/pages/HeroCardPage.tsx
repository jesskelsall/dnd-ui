import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EMPTY_CHOICE } from '../../../consts'
import { setHeroCharacterId } from '../../../reducers'
import { selectCharactersList, selectControlData, selectHeroCard } from '../../../selectors'
import { Choice } from '../../../types'
import { Dropdown } from '../../form'

export const HeroCardPage = (): JSX.Element => {
  const data = useSelector(selectControlData)
  const characters = selectCharactersList(data)
  const heroCard = selectHeroCard(data)
  const dispatch = useDispatch()

  const charactersWithLargeAvatars: Choice[] = characters
    .filter((character) => character.avatar.largeURL)
    .map((character) => ({
      label: character.names.real.name,
      value: character.id,
    }))

  return (
    <div className="page page-scroll hero-card-page">
      <div className="section">
        <h1>Character</h1>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Character</label>
          <div className="col">
            <Dropdown
              onChange={(characterId) => dispatch(setHeroCharacterId(characterId))}
              options={[EMPTY_CHOICE, ...charactersWithLargeAvatars]}
              value={heroCard.characterId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
