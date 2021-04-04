import { arrayToChoices, arrayToChoicesWithPaths } from '../../functions/choice'
import { Choice, ChoiceWithPath } from '../../types'

export const ORGANISATIONS: Choice[] = arrayToChoices([
  ['astornox', 'Astornox'],
  ['astorrel', 'Astorrel'],
  ['astornar', 'Astornar'],
  ['astornos', 'Astornos'],
])

export const RANKS: ChoiceWithPath[] = arrayToChoicesWithPaths([
  ['astorrelMember', 'Astorrel Member', '755b46068cccdb49'],
  ['astorrelGuard', 'Astorrel Guard', '044148b7db2a3a72'],
  ['astorrelGuardSergeant', 'Astorrel Guard Sergeant', '08075aea46df2ace'],
  ['astorrelSquadHand', 'Astorrel Squad Hand', '044148b7db2a3a72'],
  ['astorrelSquadLead', 'Astorrel Squad Lead', 'bda0851286f37b5a'],
  ['astorrelSquadSergeant', 'Astorrel Squad Sergeant', '08075aea46df2ace'],
  ['astorrelLieutenant', 'Astorrel Lieutenant', '0092c52f8b58c4a2'],
  ['astorrelCaptain', 'Astorrel Captain', '76e714cdfaeda22d'],
  ['astorrelMajor', 'Astorrel Major', '67d4319003b24ffa'],
  ['astorrelCommandant', 'Astorrel Commandant', 'e8ec4cb75aabb088'],
  ['astornoxGuard', 'Astornox Guard', 'a66efa0a8b232cdc'],
  ['astornoxGuardCorporal', 'Astornox Guard Corporal', 'c09b2d078dbb6f9e'],
  ['astornoxGuardSergeant', 'Astornox Guard Sergeant', '7adead962b39bf6c'],
  ['astornoxLieutenant', 'Astornox Lieutenant', '53bea5c7fd2e1e72'],
  ['astornoxCaptain', 'Astornox Captain', '91afba20c6621a84'],
  ['astornoxMajor', 'Astornox Major', '69c2dce6b0bf3d12'],
  ['astornoxCommandant', 'Astornox Commandant', 'e3762a4f45c1ab2b'],
  ['astornarMember', 'Astornar Member', '38773324efea5a7b'],
  ['astornarColonel', 'Astornar Colonel', '9aeec63a3d5da94d'],
  ['astornarGeneral', 'Astornar General', '6a65026295ebc71b'],
  ['astornarGeneralSupreme', 'Astornar General Supreme', '7a4fd381c9ae2415'],
])
