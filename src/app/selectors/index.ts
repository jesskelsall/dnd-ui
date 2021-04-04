import { RootState } from '../store'
import { Store } from '../types'

export * from './data'
export * from './page'

export const selectStore = (state: RootState): Store => state
