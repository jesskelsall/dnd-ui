import {
  CardsGrid,
  Character,
  Data,
  DataSets,
  GridCard,
  HeroCard,
  InitiativeParticipant,
  InitiativeTower,
  Name,
  Page,
  Turn,
} from '../types'
import { DEFAULT_GRADIENT_COLOURS } from './gradientColours'
import { DEFAULT_SCREEN } from './screen'

export const CARDS_GRID_TEMPLATE: CardsGrid = {
  cards: [],
  details: {
    avatar: 'character',
    primary: 'realName',
    secondary: 'raceAndClasses',
    tertiary: 'pronouns',
  },
}

export const GRID_CARD_TEMPLATE: GridCard = {
  characterId: '',
  visible: true,
}

export const HERO_CARD_TEMPLATE: HeroCard = {
  characterId: '',
}

export const INITIATIVE_PARTICIPANT_TEMPLATE: InitiativeParticipant = {
  characterId: '',
  health: {
    current: 0,
    max: 0,
    temp: 0,
  },
  id: '',
  initiative: undefined,
  quantity: 1,
  show: {
    details: true,
    quantity: true,
    status: true,
  },
  status: {
    dead: false,
    unconscious: false,
  },
}

export const NAME_TEMPLATE: Name = {
  name: '',
  scale: 1,
}

export const PAGE_TEMPLATE: Page = {
  primary: 'data',
  secondary: null,
}

export const TURN_TEMPLATE: Turn = {
  initiative: 0,
  round: 0,
}

// Composite templates

export const CHARACTER_TEMPLATE: Character = {
  affiliation: {
    division: '',
    god: '',
    group: '',
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
  icons: {
    god: '',
    rank: '',
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
    discordName: NAME_TEMPLATE,
    discordURL: '',
    name: NAME_TEMPLATE,
    pronouns: '',
  },
  pronouns: '',
  race: '',
}

export const INITIATIVE_TOWER_TEMPLATE: InitiativeTower = {
  participants: {},
  timer: {
    eachTurn: 0,
    betweenRounds: 0,
    target: undefined,
  },
  turn: TURN_TEMPLATE,
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
  realTime: true,
}
