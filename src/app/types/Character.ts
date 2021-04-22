import { Classes } from './Class'
import { GradientColours } from './Gradient'
import { Name } from './Name'

export interface Affiliation {
  division: string,
  god: string,
  group: string,
  organisation: string,
  rank: string,
}

export interface Icons {
  god: string,
  rank: string,
}

export interface Player {
  discordName: Name,
  discordURL: string,
  name: Name,
  pronouns: string,
}

export interface Character {
  affiliation: Affiliation,
  avatar: {
    gradientColours: GradientColours,
    smallURL: string,
    largeURL: string,
  },
  classes: Classes,
  icons: Icons,
  id: string,
  initiative: {
    bonus: number,
    maxHealth: number,
  },
  names: {
    display: Name,
    real: Name,
  },
  player: Player,
  pronouns: string,
  race: string,
}

export type Characters = Record<string, Character>
