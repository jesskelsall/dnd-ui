import { RootState } from '../store'
import { ScreenType } from '../types/Screen'
import { Settings } from '../types/Settings'

export const selectSettings = (state: RootState): Settings => state.settings

export const selectActiveScreen = (state: RootState): ScreenType => state.settings.activeScreen

export const selectRealTime = (state: RootState): boolean => state.settings.realTime
