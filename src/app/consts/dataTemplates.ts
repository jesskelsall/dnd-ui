import {
  CardsGrid, Character, Data, DataSets, HeroCard, InitiativeTower, Name, Page, Settings,
} from '../types'
import { DEFAULT_GRADIENT_COLOURS } from './gradientColours'
import { DEFAULT_SCREEN } from './screen'

export const CARDS_GRID_TEMPLATE: CardsGrid = {
  cards: {},
}

export const HERO_CARD_TEMPLATE: HeroCard = {
  characterId: '',
}

export const INITIATIVE_TOWER_TEMPLATE: InitiativeTower = {
  initiative: 0,
  participants: {},
  round: 0,
}

export const DATA_TEMPLATE: Data = {
  cardsGrid: CARDS_GRID_TEMPLATE,
  characters: {},
  heroCard: HERO_CARD_TEMPLATE,
  initiativeTower: INITIATIVE_TOWER_TEMPLATE,
  screen: DEFAULT_SCREEN,
}

export const DATA_SETS_TEMPLATE: DataSets = {
  control: DATA_TEMPLATE,
  display: DATA_TEMPLATE,
}

export const PAGE_TEMPLATE: Page = {
  primary: 'data',
  secondary: null,
}

export const SETTINGS_TEMPLATE: Settings = {
  realTime: true,
}

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
  initiative: {
    bonus: 0,
    maxHealth: 0,
  },
  names: {
    display: NAME_TEMPLATE,
    real: NAME_TEMPLATE,
  },
  player: {
    name: NAME_TEMPLATE,
    pronouns: '',
  },
  pronouns: '',
  race: '',
}
