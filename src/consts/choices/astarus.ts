import { arrayToChoices, arrayToChoicesWithPaths } from '../../functions/arrayToChoices'
import { Choice, ChoiceWithPath } from '../../types/Choice'

export const ORGANISATIONS: Choice[] = arrayToChoices([
  'Astornar',
  'Astornos',
  'Astornox',
  'Astorrel',
])

export const RANKS: ChoiceWithPath[] = arrayToChoicesWithPaths([
  ['Astorrel Member', '65a2f8bd957242ea'],
  ['Astorrel Guard', '044148b7db2a3a72'],
  ['Astorrel Guard Corporal', 'bda0851286f37b5a'],
  ['Astorrel Guard Sergeant', '08075aea46df2ace'],
  ['Astorrel Squad Hand', '044148b7db2a3a72'],
  ['Astorrel Squad Lead', 'bda0851286f37b5a'],
  ['Astorrel Squad Sergeant', '08075aea46df2ace'],
  ['Astorrel Lieutenant', '0092c52f8b58c4a2'],
  ['Astorrel Captain', '76e714cdfaeda22d'],
  ['Astorrel Major', '67d4319003b24ffa'],
  ['Astorrel Commandant', 'e8ec4cb75aabb088'],
  ['Astornox Guard', '1ccd60e30d8273e1'],
  ['Astornox Guard Corporal', 'c09b2d078dbb6f9e'],
  ['Astornox Guard Sergeant', '7adead962b39bf6c'],
  ['Astornox Lieutenant', '53bea5c7fd2e1e72'],
  ['Astornox Captain', '91afba20c6621a84'],
  ['Astornox Major', '69c2dce6b0bf3d12'],
  ['Astornox Commandant', 'e3762a4f45c1ab2b'],
  ['Astornar Member', '38773324efea5a7b'],
  ['Astornar Colonel', '9aeec63a3d5da94d'],
  ['Astornar General', '6a65026295ebc71b'],
  ['Astornar General Supreme', '7a4fd381c9ae2415'],
])
