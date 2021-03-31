import { Data } from '../../types/data'
import { Character } from '../types/Character'
import { DisplayCharacter } from '../../types/data/displayCharacter'
import { DEFAULT_GRADIENT_COLOURS } from './gradientColours'
import { Name } from '../types/Name'

export const NAME_TEMPLATE: Name = {
  name: '',
  scale: '1',
}

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
    display: NAME_TEMPLATE,
    player: NAME_TEMPLATE,
    real: NAME_TEMPLATE,
  },
  pronouns: {
    character: '',
    player: '',
  },
  race: '',
}

export const DATA_TEMPLATE: Data = {
  characters: {},
  display: {
    displayCharacters: {},
  },
}

export const DISPLAY_CHARACTER_TEMPLATE: DisplayCharacter = {
  characterId: '',
  id: '',
  lines: {
    primary: 'realName',
    secondary: 'raceAndClasses',
    tertiary: 'pronouns',
  },
  position: {
    column: 0,
    row: 0,
  },
  show: {
    avatar: true,
    card: true,
  },
}
