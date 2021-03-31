import { createSelector } from '@reduxjs/toolkit'
import { keyBy } from 'lodash/fp'
import { Data } from '../types/Data'
import { selectCharacters } from './characters'
import { selectScreen } from './screen'
import { selectSettings } from './settings'

export const selectData = createSelector(
  selectCharacters,
  selectScreen,
  selectSettings,
  (characters, screen, settings): Data => ({
    characters: keyBy('id', characters),
    screen,
    settings,
  }),
)
