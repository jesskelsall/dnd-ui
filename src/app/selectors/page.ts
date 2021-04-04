import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Page } from '../types'
import { selectControlData } from './data'

export const selectPage = (state: RootState): Page => state.page

export const selectEditingCharacter = createSelector(
  selectControlData,
  selectPage,
  (data, page) => {
    if (page.primary !== 'characters' || !page.secondary) return null
    return data.characters[page.secondary] || null
  },
)
