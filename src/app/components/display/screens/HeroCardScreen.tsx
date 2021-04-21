import React from 'react'
import { LINE_TRANSFORMERS } from '../../../consts'
import { Characters, HeroCard } from '../../../types'
import { LargeCharacterCard } from '../LargeCharacterCard'

export interface HeroCardScreenProps {
  characters: Characters,
  heroCard: HeroCard,
}

export const HeroCardScreen = ({
  characters,
  heroCard,
}: HeroCardScreenProps): JSX.Element | null => {
  if (!heroCard.characterId) return null

  const character = characters[heroCard.characterId]

  return (
    <div className="page hero-card-screen">
      <LargeCharacterCard
        affiliation={character.affiliation}
        avatar={{
          url: character.avatar.largeURL,
          backgroundGradientColours: character.avatar.gradientColours,
        }}
        classes={LINE_TRANSFORMERS.classesWithLevels(character)}
        name={character.names.real}
        player={character.player}
        pronouns={character.pronouns}
        race={character.race}
      />
    </div>
  )
}
