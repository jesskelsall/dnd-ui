import {
  choiceName, classesToList, classesToListWithLevels, joinLineTransformers,
} from '../functions'
import { Character, Line, LineTransformer } from '../types'
import {
  ORGANISATIONS, RACES, RANKS,
} from './choices'
import { LINE_SEPARATOR } from './separators'

const classes: LineTransformer = (character) => classesToList(character.classes)
const division: LineTransformer = (character) => character.affiliation.division
const organisation: LineTransformer = (
  character,
) => choiceName(character.affiliation.organisation, ORGANISATIONS)
const playerName: LineTransformer = (character) => character.player.name.name
const playerPronouns: LineTransformer = (character) => character.player.pronouns
const pronouns: LineTransformer = (character) => character.pronouns
const race: LineTransformer = (character) => choiceName(character.race, RACES)

export const LINE_TRANSFORMERS: Record<Line, LineTransformer> = {
  blank: () => '',
  classes,
  classesWithLevels: (character: Character) => classesToListWithLevels(character.classes),
  displayName: (character: Character) => character.names.display.name,
  division,
  group: (character: Character) => character.affiliation.group,
  organisation,
  organisationAndDivision: joinLineTransformers([organisation, division], LINE_SEPARATOR),
  pronouns,
  race,
  raceAndClasses: joinLineTransformers([race, classes]),
  raceAndPronouns: joinLineTransformers([race, pronouns], LINE_SEPARATOR),
  rank: (character: Character) => choiceName(character.affiliation.rank, RANKS),
  realName: (character: Character) => character.names.real.name,
  playerName,
  playerNameAndPronouns: joinLineTransformers([playerName, playerPronouns], LINE_SEPARATOR),
  playerPronouns,
  unknown: () => '???',
}

export const NAME_LINES: Line[] = [
  'blank',
  'displayName',
  'playerName',
  'realName',
]

export const NON_NAME_LINES: Line[] = [
  'blank',
  ...(Object.keys(LINE_TRANSFORMERS) as Line[]).filter((line) => !NAME_LINES.includes(line)),
]
