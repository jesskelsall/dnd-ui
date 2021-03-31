import { Character } from './Character'

export type Line =
  'blank' |
  'classes' |
  'classesWithLevels' |
  'displayName' |
  'division' |
  'group' |
  'organisation' |
  'organisationAndDivision' |
  'playerName' |
  'playerNameAndPronouns' |
  'playerPronouns' |
  'pronouns' |
  'race' |
  'raceAndClasses' |
  'raceAndPronouns' |
  'rank' |
  'realName' |
  'unknown'

export type LineTransformer = (character: Character) => string
