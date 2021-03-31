import { sortBy } from 'lodash/fp'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Character } from '../types/Character'
import { selectPage } from './page'

export const selectCharacters = (state: RootState): Character[] => sortBy(
  (character: Character) => character.names.real.name.toLowerCase(),
  Object.values(state.characters),
)

export const selectEditingCharacter = createSelector(
  selectCharacters,
  selectPage,
  (characters, page) => {
    if (page.primary !== 'characters' || !page.secondary) return undefined
    return characters.find((character) => character.id === page.secondary)
  },
)
