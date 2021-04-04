import { GradientColours } from './Gradient'
import { Class } from './Class'
import { Name } from './Name'

export interface Character {
  affiliation: {
    division: string,
    group: string,
    iconURL: string,
    organisation: string,
    rank: string,
  },
  avatar: {
    gradientColours: GradientColours,
    smallURL: string,
    largeURL: string,
  },
  classes: Record<Class, number>,
  id: string,
  initiative: {
    bonus: number,
    maxHealth: number,
  },
  names: {
    display: Name,
    real: Name,
  },
  player: {
    name: Name,
    pronouns: string,
  },
  pronouns: string,
  race: string,
}

export type Characters = Record<string, Character>
