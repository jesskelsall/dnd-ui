import { sortBy } from 'lodash/fp'
import { RootState } from '../store'
import {
  Character, Characters, Data, Screen,
} from '../types'

// Select data from store

export const selectControlData = (state: RootState): Data => state.data.control
export const selectDisplayData = (state: RootState): Data => state.data.display

// Select values from data

export const selectCharacters = (data: Data): Characters => data.characters
export const selectCharactersList = (data: Data): Character[] => sortBy('names.real.name', data.characters)

export const selectScreen = (data: Data): Screen => data.screen
