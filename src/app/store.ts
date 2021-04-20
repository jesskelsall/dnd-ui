import { configureStore } from '@reduxjs/toolkit'
import { dataReducer, pageReducer } from './reducers'

export const store = configureStore({
  reducer: {
    data: dataReducer,
    page: pageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
