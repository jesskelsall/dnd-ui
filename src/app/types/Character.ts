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
  names: {
    display: Name,
    player: Name,
    real: Name,
  },
  pronouns: {
    character: string,
    player: string,
  },
  race: string,
}

export type Characters = Record<string, Character>
