import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setScreen } from '../actions'
import { PAGE_TEMPLATE } from '../consts'
import { Page } from '../types'

const initialState: Page = PAGE_TEMPLATE

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setEditCharacterPage: (state, action: PayloadAction<string>) => ({
      primary: 'characters',
      secondary: action.payload,
    }),
    setPage: (state, action: PayloadAction<Page>) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(setScreen, (state, action) => ({
      primary: 'screens',
      secondary: action.payload,
    }))
  },
})

export const pageReducer = pageSlice.reducer

export const { setEditCharacterPage, setPage } = pageSlice.actions
