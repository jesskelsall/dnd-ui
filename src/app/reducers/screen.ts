import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setData } from '../actions/data'
import { DEFAULT_SCREEN } from '../consts/screen'
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
  extraReducers: (builder) => {
    builder.addCase(setData, (state, action) => action.payload.screen)
  },
})

export const screenReducer = screenSlice.reducer

export const { setScreen } = screenSlice.actions
