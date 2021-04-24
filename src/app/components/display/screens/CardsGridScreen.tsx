import { orderBy } from 'lodash/fp'
import React from 'react'
import { DEFAULT_GRADIENT_COLOURS, LINE_TRANSFORMERS } from '../../../consts'
import {
  CardsGridDetails, Character, Characters, GridCard,
} from '../../../types'
import { AvatarProps } from '../Avatar'
import { SmallCharacterCard } from '../SmallCharacterCard'

export interface CardsGridScreenProps {
  characters: Characters,
  columns: GridCard[][],
  details: CardsGridDetails,
}

export const CardsGridScreen = ({
  characters,
  columns,
  details,
}: CardsGridScreenProps): JSX.Element => {
  const getAvatarProps = (character: Character): AvatarProps => {
    let backgroundGradientColours = DEFAULT_GRADIENT_COLOURS
    let url = ''

    if (details.avatar === 'character') {
      backgroundGradientColours = character.avatar.gradientColours
      url = character.avatar.smallURL
    }
    if (details.avatar === 'player') url = character.player.discordURL

    return { backgroundGradientColours, url }
  }

  const getTextPrimaryScale = (character: Character): number => {
    if (details.primary === 'displayName') return character.names.display.scale
    if (details.primary === 'playerName') return character.player.name.scale
    if (details.primary === 'realName') return character.names.real.scale
    return 1
  }

  return (
    <div className="screen cards-grid-screen">
      {columns.map((column) => (
        <div className="screen-column four-cards">
          {column.map((card) => {
            const character = characters[card.characterId]

            return (
              <SmallCharacterCard
                avatar={getAvatarProps(character)}
                icon={character.icons.rank}
                key={character.id}
                textPrimaryScale={getTextPrimaryScale(character)}
                textPrimary={LINE_TRANSFORMERS[details.primary](character)}
                textSecondary={LINE_TRANSFORMERS[details.secondary](character)}
                textTertiary={LINE_TRANSFORMERS[details.tertiary](character)}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
