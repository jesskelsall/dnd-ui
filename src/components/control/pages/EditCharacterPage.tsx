import {
  flow, get, set, unset,
} from 'lodash/fp'
import React from 'react'
import { Character } from '../../../app/types/Character'
import { DataPropagationProps } from '../../../types/DataPropagation'
import { CharacterEditor } from '../CharacterEditor'

export interface EditCharacterPage extends DataPropagationProps {
  characterId: string,
  onChangeEditingCharacterId: (characterId: string) => void,
  onFinishEdit: () => void,
}

export const EditCharacterPage = ({
  characterId,
  data,
  onChangeData,
  onChangeEditingCharacterId,
  onFinishEdit,
  realTime,
}: EditCharacterPage): JSX.Element => {
  const character = get(characterId, data.characters)

  const updateCharacter = (updatedCharacter: Character) => {
    onChangeData(flow(
      unset(`characters.${characterId}`),
      set(`characters.${updatedCharacter.id}`, updatedCharacter),
    )(data))

    onChangeEditingCharacterId(updatedCharacter.id)
  }

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
