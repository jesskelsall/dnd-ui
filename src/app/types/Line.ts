import { Character } from './Character'

export type Line =
  'blank' |
  'classes' |
  'classesWithLevels' |
  'displayName' |
  'division' |
  'divisionAndGroup' |
  'group' |
  'organisation' |
  'organisationAndDivision' |
  'playerDiscord' |
  'playerName' |
  'playerNameAndDiscord' |
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
