import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Page } from '../types/Page'

const initialState: Page = {
  primary: 'data',
  secondary: null,
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<Page>) => action.payload,
  },
})

export const pageReducer = pageSlice.reducer

export const { setPage } = pageSlice.actions
