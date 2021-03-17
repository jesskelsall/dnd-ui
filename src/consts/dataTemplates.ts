import { Data } from '../types/data'
import { Character } from '../types/data/character'
import { DEFAULT_GRADIENT_COLOURS } from './gradientColours'

export const CHARACTER_TEMPLATE: Character = {
  affiliation: {
    division: '',
    group: '',
    iconURL: '',
    organisation: '',
    rank: '',
  },
  avatar: {
    gradientColours: DEFAULT_GRADIENT_COLOURS,
    smallURL: '',
    largeURL: '',
  },
  class: '',
  id: '',
  name: {
    displayName: '',
    realName: '',
  },
  pronouns: '',
  race: '',
}

export const DATA_TEMPLATE: Data = {
  characters: {},
}
