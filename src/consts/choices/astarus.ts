import { arrayToChoices, arrayToChoicesWithPaths } from '../../functions/arrayToChoices'
import { Choice, ChoiceWithPath } from '../../types/Choice'

export const ORGANISATIONS: Choice[] = arrayToChoices([
  'Astornar',
  'Astornos',
  'Astornox',
  'Astorrel',
])

export const RANKS: ChoiceWithPath[] = arrayToChoicesWithPaths([
  ['Astornox Guard', 'astornox-1-guard'],
  ['Astornox Guard Corporal', 'astornox-2-guard-corporal'],
  ['Astornox Guard Sergeant', 'astornox-3-guard-sergeant'],
  ['Astornox Lieutenant', 'astornox-4-lieutenant'],
  ['Astornox Captain', 'astornox-5-captain'],
  ['Astornox Major', 'astornox-6-major'],
  ['Astornox Commandant', 'astornox-7-commandant'],
  ['Astorrel Member', 'astorrel-1-recruit'],
  ['Astorrel Squad Hand', 'astorrel-2-private'],
  ['Astorrel Squad Lead', 'astorrel-3-corporal'],
  ['Astorrel Squad Sergeant', 'astorrel-4-sergeant'],
  ['Astorrel Lieutenant', 'astorrel-5-lieutenant'],
  ['Astorrel Captain', 'astorrel-6-captain'],
  ['Astorrel Major', 'astorrel-7-major'],
  ['Astorrel Commandant', 'astorrel-8-commandant'],
  ['Astorrel Guard', 'astorrel-2-private'],
  ['Astorrel Guard Corporal', 'astorrel-3-corporal'],
  ['Astorrel Guard Sergeant', 'astorrel-4-sergeant'],
])
