import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { set } from 'lodash/fp'
import { DEFAULT_SCREEN } from '../consts/page'
import { ScreenType } from '../types/Screen'
import { Settings } from '../types/Settings'
import { setPage } from './page'

const initialState: Settings = {
  activeScreen: DEFAULT_SCREEN,
  realTime: true,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setActiveScreen: (state, action: PayloadAction<ScreenType>) => set('activeScreen', action.payload, state),
    setRealTime: (state, action: PayloadAction<boolean>) => set('realTime', action.payload, state),
  },
  extraReducers: (builder) => {
    builder.addCase(setPage, (state, action) => {
      if (action.payload.primary === 'screens' && action.payload.secondary) {
        return set('activeScreen', action.payload.secondary, state)
      }
      return state
    })
  },
})

export const settingsReducer = settingsSlice.reducer

export const { setActiveScreen, setRealTime } = settingsSlice.actions
