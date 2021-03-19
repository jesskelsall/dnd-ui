import { set, sortBy, unset } from 'lodash/fp'
import React from 'react'
import { CHARACTER_TEMPLATE } from '../../../consts/dataTemplates'
import { randomId } from '../../../functions/random'
import { Character } from '../../../types/data/character'
import { DataPropagationProps } from '../../../types/DataPropagation'
import { CharacterControl } from '../CharacterControl'

export interface CharactersPageProps extends DataPropagationProps {
  onStartEdit: (characterId: string) => void,
}

export const CharactersPage = ({
  data,
  onChangeData,
  onStartEdit,
}: CharactersPageProps): JSX.Element => {
  const characters = sortBy(
    (character: Character) => character.name.realName.toLowerCase(),
    Object.values(data.characters),
  )

  const createCharacter = () => {
    const characterId = randomId()
    const character = set('id', characterId, CHARACTER_TEMPLATE)

    onChangeData(set(`characters.${characterId}`, character, data))
    onStartEdit(characterId)
  }

  const duplicateCharacter = (characterId: string) => {
    const baseCharacter = data.characters[characterId]
    const newCharacterId = randomId()
    const newCharacter = set('id', newCharacterId, baseCharacter)

    onChangeData(set(`characters.${newCharacterId}`, newCharacter, data))
    onStartEdit(newCharacterId)
  }

  const deleteCharacter = (characterId: string) => onChangeData(
    unset(`characters.${characterId}`, data),
  )

  return (
    <div className="characters-area">
      <table className="table characters-list">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Real Name</th>
            <th>Race</th>
            <th>Class</th>
            <th className="characters-list-actions">
              <div className="characters-list-actions-buttons">
                <button className="btn btn-success" onClick={createCharacter} type="button">Create Character</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <CharacterControl
              character={character}
              key={character.id}
              onDelete={() => deleteCharacter(character.id)}
              onDuplicate={() => duplicateCharacter(character.id)}
              onEdit={() => onStartEdit(character.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
