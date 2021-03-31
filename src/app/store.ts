import { configureStore } from '@reduxjs/toolkit'
import {
  charactersReducer, pageReducer, screenReducer, settingsReducer,
} from './reducers'

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    page: pageReducer,
    screen: screenReducer,
    settings: settingsReducer,
    //   characterCards: characterCardsReducer,
    //   heroCard: heroCardsReducer,
    //   initiativeTower: initiativeTowerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// MODES:
// character cards - list of character cards in rows/columns
// hero card - a single large character card
// initiative tower - initiative character cards in order with active turn, sense of health

// PAGES:
// Characters - NPCs / monsters available for use on other pages
// Display - Controls for what to display on the screen
// - Character Cards
// - Hero Card
// - Initiative Order
// Data - importing and exporting data in a JSON structure. This includes display setup

// REDUX SEPARATION:
// characters
// screens:
// -- characterCards
// -- heroCard
// -- initiativeTower
// pages
