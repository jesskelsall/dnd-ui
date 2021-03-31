import { RootState } from '../store'
import { Page } from '../types/Page'

export const selectPage = (state: RootState): Page => state.page
