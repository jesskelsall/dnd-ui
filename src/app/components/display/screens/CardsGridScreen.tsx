import { orderBy } from 'lodash/fp'
import React from 'react'
import { LINE_TRANSFORMERS } from '../../../consts'
import { CardsGrid, Characters } from '../../../types'
import { SmallCharacterCard } from '../SmallCharacterCard'

export interface CardsGridScreenProps {
  cardsGrid: CardsGrid,
  characters: Characters
}

export const CardsGridScreen = ({
  cardsGrid,
  characters,
}: CardsGridScreenProps): JSX.Element => {
  const sortedCharacters = orderBy(
    ['affiliation.group', 'names.real.name'],
    ['desc', 'asc'],
    characters,
  )

  return (
    <div className="screen">
      <div className="screen-column">
        {sortedCharacters.map((character) => (
          <SmallCharacterCard
            avatar={{
              backgroundGradientColours: character.avatar.gradientColours,
              url: character.avatar.smallURL,
            }}
            iconURL={character.affiliation.iconURL}
            key={character.id}
            textPrimaryScale={1}
            textPrimary={LINE_TRANSFORMERS.realName(character)}
            textSecondary={LINE_TRANSFORMERS.raceAndClasses(character)}
            textTertiary={LINE_TRANSFORMERS.pronouns(character)}
          />
        ))}
      </div>
    </div>
  )
}
