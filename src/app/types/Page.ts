import { ScreenType } from './Screen'

export type PrimaryPage = 'characters' | 'screens' | 'data'

export interface Page {
  primary: PrimaryPage,
  secondary: ScreenType | string | null,
}
