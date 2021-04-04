import { Screen } from './Screen'

export type PrimaryPage = 'characters' | 'screens' | 'data'

export interface Page {
  primary: PrimaryPage,
  secondary: Screen | string | null,
}
