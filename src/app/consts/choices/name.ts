import { arrayToChoices } from '../../functions/choice'
import { Choice } from '../../types'

export const NAME_SCALES: Choice<number>[] = arrayToChoices<number>([
  [1, '1x'],
  [0.9, '0.9x'],
  [0.8, '0.8x'],
])
