import { set } from 'lodash/fp'
import React from 'react'
import { Data } from '../../types/data'
import { Character } from '../../types/data/character'
import { CharacterEditor } from './CharacterEditor'

export interface ControlAreaProps {
  data: Data,
  onSave: (data: Data) => void,
}

export const ControlArea = ({
  data,
  onSave,
}: ControlAreaProps): JSX.Element => {
  const onSaveAhsha = (ahsha: Character) => {
    onSave(set('characters.ahsha', ahsha, data))
  }

  return (
    <div className="area control-area">
      <CharacterEditor
        character={data.characters.ahsha}
        onSave={onSaveAhsha}
      />
    </div>
  )
}
