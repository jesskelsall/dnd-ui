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
  classes: {
    barbarian: 0,
    bard: 0,
    cleric: 0,
    druid: 0,
    fighter: 0,
    monk: 0,
    paladin: 0,
    ranger: 0,
    rogue: 0,
    sorcerer: 0,
    warlock: 0,
    wizard: 0,
  },
  id: '',
  names: {
    display: {
      name: '',
      scale: '1',
    },
    real: {
      name: '',
      scale: '1',
    },
  },
  pronouns: '',
  race: '',
}

export const DATA_TEMPLATE: Data = {
  characters: {},
}
