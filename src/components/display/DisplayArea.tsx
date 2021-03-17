import React from 'react'
import { Data } from '../../types/data'
import { SmallCharacterCard } from './SmallCharacterCard'

export interface DisplayAreaProps {
  data: Data,
}

export const DisplayArea = ({
  data,
}: DisplayAreaProps): JSX.Element => (
  <div className="area display-area">
    {Object.values(data.characters).map((character) => (
      <SmallCharacterCard
        avatar={{
          backgroundGradientColours: character.avatar.gradientColours,
          url: character.avatar.smallURL,
        }}
        iconURL={character.affiliation.iconURL}
        textPrimary={character.name.realName}
        textSecondary={`${character.race} ${character.class}`}
        textTertiary={character.pronouns}
      />
    ))}
  </div>
)
