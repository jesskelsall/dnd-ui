import { Line } from './Line'

export interface GridCard {
  characterId: string,
  id: string,
  lines: {
    primary: Line,
    primaryScale: string,
    secondary: Line,
    tertiary: Line,
  },
  position: {
    column: number,
    row: number,
  },
  show: {
    avatar: boolean,
    card: boolean,
    icon: boolean,
  },
}

export type GridCards = Record<string, GridCard>

export interface CardsGrid {
  cards: GridCards,
}
