import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomId } from '../../../functions/random'
import {
  createCharacter, deleteCharacter, duplicateCharacter, setEditCharacterPage,
} from '../../../reducers'
import { selectCharactersList, selectControlData } from '../../../selectors'
import { CharacterControl } from '../CharacterControl'

export const CharactersPage = (): JSX.Element => {
  const data = useSelector(selectControlData)
  const characters = selectCharactersList(data)
  const dispatch = useDispatch()

  const onCreateCharacter = () => {
    const id = randomId()
    dispatch(createCharacter(id))
    dispatch(setEditCharacterPage(id))
  }

  const onDuplicateCharacter = (existingId: string) => () => {
    const newId = randomId()
    dispatch(duplicateCharacter({ existingId, newId }))
    dispatch(setEditCharacterPage(newId))
  }

  return (
    <div className="page page-scroll">
      <table className="table characters-list">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Real Name</th>
            <th>Race</th>
            <th>Class</th>
            <th className="characters-list-actions">
              <div className="characters-list-actions-buttons">
                <button className="btn btn-success" onClick={onCreateCharacter} type="button">Create Character</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <CharacterControl
              character={character}
              key={character.id}
              onDelete={() => dispatch(deleteCharacter(character.id))}
              onDuplicate={onDuplicateCharacter(character.id)}
              onEdit={() => dispatch(setEditCharacterPage(character.id))}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
