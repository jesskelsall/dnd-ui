import { Line } from './Line'

// TODO
// export interface GridCard {
//   characterId: string,
//   id: string,
//   lines: {
//     primary: Line,
//     primaryScale: string,
//     secondary: Line,
//     tertiary: Line,
//   },
//   position: {
//     column: number,
//     row: number,
//   },
//   show: {
//     avatar: boolean,
//     card: boolean,
//     icon: boolean,
//   },
// }
//
// export type GridCards = Record<string, GridCard>

export type AvatarType = 'none' | 'character' | 'player'

export interface GridCard {
  characterId: string,
  visible: boolean,
}

export interface CardsGridDetails {
  avatar: AvatarType,
  primary: Line,
  secondary: Line,
  tertiary: Line,
}

export interface CardsGrid {
  cards: GridCard[],
  details: CardsGridDetails,
}
