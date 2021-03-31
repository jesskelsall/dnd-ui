import React, { useState } from 'react'
import { LINE_TRANSFORMERS } from '../../app/consts/line'
import { Line } from '../../app/types/Line'
import { Data } from '../../types/data'
import { SmallCharacterCard } from './SmallCharacterCard'

export interface DisplayAreaProps {
  data: Data,
}

export const DisplayArea = ({
  data,
}: DisplayAreaProps): JSX.Element => {
  const [primary, setPrimary] = useState<Line>('realName')
  const [secondary, setSecondary] = useState<Line>('raceAndClasses')
  const [tertiary, setTertiary] = useState<Line>('pronouns')

  return (
    <div className="area display-area">
      {Object.values(data.characters).map((character) => (
        <SmallCharacterCard
          avatar={{
            backgroundGradientColours: character.avatar.gradientColours,
            url: character.avatar.smallURL,
          }}
          iconURL={character.affiliation.iconURL}
          key={character.id}
          // textPrimary={character.names.real.name}
          textPrimaryScale={1}
          // textSecondary={[
          //   choiceName(character.race, RACES),
          //   classesToList(character.classes),
          // ].filter((text) => text).join(' ')}
          // textTertiary={choiceName(character.pronouns, PRONOUNS)}
          textPrimary={LINE_TRANSFORMERS[primary](character)}
          textSecondary={LINE_TRANSFORMERS[secondary](character)}
          textTertiary={LINE_TRANSFORMERS[tertiary](character)}
        />
      ))}
      {/* <DropdownField<Line>
        onChange={(line) => setPrimary(line)}
        options={LINES}
        value={primary}
      />
      <DropdownField<Line>
        onChange={(line) => setSecondary(line)}
        options={LINES}
        value={secondary}
      />
      <DropdownField<Line>
        onChange={(line) => setTertiary(line)}
        options={LINES}
        value={tertiary}
      /> */}
    </div>
  )
}
