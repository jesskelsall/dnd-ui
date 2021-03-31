import { arrayToChoices } from '../../functions/choice'
import { Choice } from '../../types/Choice'
import { Line } from '../../types/Line'
import { LINE_SEPARATOR } from '../separators'

const joinWithSeparator = (strings: string[]) => strings.join(LINE_SEPARATOR)

export const LINES: Choice<Line>[] = arrayToChoices<Line>([
  ['blank', '-'],
  ['classes', 'Classes'],
  ['classesWithLevels', 'Classes (Level)'],
  ['displayName', 'Display Name'],
  ['division', 'Division'],
  ['group', 'Group'],
  ['organisation', 'Organisation'],
  ['organisationAndDivision', joinWithSeparator(['Organisation', 'Division'])],
  ['pronouns', 'Pronouns'],
  ['race', 'Race'],
  ['raceAndClasses', 'Race Classes'],
  ['raceAndPronouns', joinWithSeparator(['Race', 'Pronouns'])],
  ['rank', 'Rank'],
  ['realName', 'Real Name'],
])
