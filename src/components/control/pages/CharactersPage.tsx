import { set } from 'lodash/fp'
import React from 'react'
import { Character } from '../../../types/data/character'
import { DataPropagationProps } from '../../../types/DataPropagation'
import { CharacterEditor } from '../CharacterEditor'

export const CharactersPage = ({
  data,
  onSave,
}: DataPropagationProps): JSX.Element => {
  const onSaveAhsha = (ahsha: Character) => {
    onSave(set('characters.ahsha', ahsha, data))
  }

  return (
    <div className="control-area-content">
      <CharacterEditor
        character={data.characters.ahsha}
        onSave={onSaveAhsha}
      />
    </div>
  )
}
