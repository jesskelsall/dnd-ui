import { GradientColours } from '../Gradient'
import { Class } from './class'
import { Name } from './name'

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
    real: Name,
  },
  pronouns: string,
  race: string,
}
