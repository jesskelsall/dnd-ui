import React from 'react'
import { PRONOUNS, RACES } from '../../consts/choices'
import { choiceName } from '../../functions/choice'
import { classesToList } from '../../functions/classes'
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
        key={character.id}
        textPrimary={character.names.real.name}
        textPrimaryScale={1}
        textSecondary={[
          choiceName(character.race, RACES),
          classesToList(character.classes),
        ].filter((text) => text).join(' ')}
        textTertiary={choiceName(character.pronouns, PRONOUNS)}
      />
    ))}
  </div>
)
