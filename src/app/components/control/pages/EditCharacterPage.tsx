import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../../../reducers'
import { updateCharacter } from '../../../reducers/charaters'
import { selectEditingCharacter } from '../../../selectors'
import { Character } from '../../../types/Character'
import { CharacterEditor } from '../CharacterEditor'

export const EditCharacterPage = (): JSX.Element | null => {
  const character = useSelector(selectEditingCharacter)
  const dispatch = useDispatch()

  if (!character) return null

  const closeEditor = () => dispatch(setPage({ primary: 'characters', secondary: null }))

  const saveCharacter = (editedCharacter: Character) => dispatch(updateCharacter({
    id: character.id,
    character: editedCharacter,
  }))

  return (
    <CharacterEditor
      character={character}
      onClose={closeEditor}
      onSave={saveCharacter}
    />
  )
}
