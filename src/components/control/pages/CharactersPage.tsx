import { set } from 'lodash/fp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHARACTER_TEMPLATE } from '../../../app/consts/dataTemplates'
import { randomId } from '../../../app/functions/random'
import { addCharacter, removeCharacter } from '../../../app/reducers'
import { setPage } from '../../../app/reducers/page'
import { selectCharacters } from '../../../app/selectors'
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
  const characters = useSelector(selectCharacters)
  const dispatch = useDispatch()

  const onAddCharacter = (baseCharacter = CHARACTER_TEMPLATE) => () => {
    const id = randomId()
    const character = set('id', id, baseCharacter)

    dispatch(addCharacter({ character, id }))
    dispatch(setPage({ primary: 'characters', secondary: id }))
  }

  const onEditCharacter = (id: string) => () => {
    dispatch(setPage({ primary: 'characters', secondary: id }))
  }

  const onDeleteCharacter = (characterId: string) => () => dispatch(removeCharacter(characterId))

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
                <button className="btn btn-success" onClick={onAddCharacter()} type="button">Create Character</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <CharacterControl
              character={character}
              key={character.id}
              onDelete={onDeleteCharacter(character.id)}
              onDuplicate={onAddCharacter(character)}
              onEdit={onEditCharacter(character.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
