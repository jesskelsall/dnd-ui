import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_SCREEN } from '../consts/page'
import { GenericScreen, Screen } from '../types/Screen'

const initialState: GenericScreen = {
  type: DEFAULT_SCREEN,
}

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setScreen: (state, action: PayloadAction<Screen>) => action.payload,
  },
})

export const screenReducer = screenSlice.reducer

export const { setScreen } = screenSlice.actions
