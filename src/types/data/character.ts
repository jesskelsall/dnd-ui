import { GradientColours } from '../Gradient'

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
  class: string,
  id: string,
  name: {
    displayName: string,
    realName: string,
  },
  pronouns: string,
  race: string,
}
