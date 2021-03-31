import React from 'react'
import { useSelector } from 'react-redux'
import { LINE_TRANSFORMERS } from '../../../consts/line'
import { selectCharacters } from '../../../selectors'
import { SmallCharacterCard } from '../SmallCharacterCard'

export const CardsGridScreen = (): JSX.Element => {
  const characters = useSelector(selectCharacters)

  return (
    <div className="page page-center cards-grid-screen">
      {characters.map((character) => (
        <SmallCharacterCard
          avatar={{
            backgroundGradientColours: character.avatar.gradientColours,
            url: character.avatar.smallURL,
          }}
          iconURL={character.affiliation.iconURL}
          key={character.id}
          textPrimaryScale={1}
          textPrimary={LINE_TRANSFORMERS.displayName(character)}
          textSecondary={LINE_TRANSFORMERS.playerNameAndPronouns(character)}
          textTertiary={LINE_TRANSFORMERS.blank(character)}
        />
      ))}
    </div>
  )
}
