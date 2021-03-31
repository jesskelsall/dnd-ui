import { RootState } from '../store'
import { Screen } from '../types/Screen'

export const selectScreen = (state: RootState): Screen => state.screen

export const generateScreen = (state: RootState): Screen => ({
  type: state.settings.activeScreen,
})
