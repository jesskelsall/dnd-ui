import { createSlice } from '@reduxjs/toolkit'
import { setStore } from '../actions'
import { SETTINGS_TEMPLATE } from '../consts'
import { Settings } from '../types'

const initialState: Settings = SETTINGS_TEMPLATE

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setStore, (state, action) => action.payload.settings)
  },
})

export const settingsReducer = settingsSlice.reducer
