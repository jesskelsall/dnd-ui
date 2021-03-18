import { get, set } from 'lodash/fp'
import React from 'react'
import { Character } from '../../../types/data/character'
import { DataPropagationProps } from '../../../types/DataPropagation'
import { CharacterEditor } from '../CharacterEditor'

export interface EditCharacterPage extends DataPropagationProps {
  characterId: string,
  onFinishEdit: () => void,
}

export const EditCharacterPage = ({
  characterId,
  data,
  onChangeData,
  onFinishEdit,
  realTime,
}: EditCharacterPage): JSX.Element => {
  const character = get(characterId, data.characters)

  const updateCharacter = (updatedCharacter: Character) => onChangeData(
    set(`characters.${characterId}`, updatedCharacter, data),
  )

  return (
    <div className="control-area-content">
      <CharacterEditor
        character={character}
        onClose={onFinishEdit}
        onChangeData={updateCharacter}
        realTime={realTime}
      />
    </div>
  )
}
