import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditCharacterPage, setPage, updateCharacter } from '../../../reducers'
import { selectEditingCharacter } from '../../../selectors'
import { Character } from '../../../types'
import { CharacterEditor } from '../CharacterEditor'

export const EditCharacterPage = (): JSX.Element | null => {
  const character = useSelector(selectEditingCharacter)
  const dispatch = useDispatch()

  if (!character) return null

  const onClose = () => dispatch(setPage({
    primary: 'characters',
    secondary: null,
  }))

  const onSave = (editedCharacter: Character) => {
    dispatch(updateCharacter({
      id: character.id,
      character: editedCharacter,
    }))

    if (character.id !== editedCharacter.id) {
      dispatch(setEditCharacterPage(editedCharacter.id))
    }
  }

  return (
    <CharacterEditor
      character={character}
      onClose={onClose}
      onSave={onSave}
    />
  )
}
