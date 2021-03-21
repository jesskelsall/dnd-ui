import { arrayToChoices } from '../../functions/choice'
import { Choice } from '../../types/Choice'

export const PRONOUNS: Choice[] = arrayToChoices([
  ['masculine', 'he/him'],
  ['feminine', 'she/her'],
  ['nonBinary', 'they/them'],
])
