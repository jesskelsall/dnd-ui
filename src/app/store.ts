import { configureStore } from '@reduxjs/toolkit'
import { dataReducer, pageReducer, settingsReducer } from './reducers'

export const store = configureStore({
  reducer: {
    data: dataReducer,
    page: pageReducer,
    settings: settingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
