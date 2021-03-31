import { Line } from '../../app/types/Line'

export interface DisplayCharacter {
  characterId: string,
  id: string,
  lines: {
    primary: Line,
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
  },
}
