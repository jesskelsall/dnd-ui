import { CLASSES, RACES } from '../../consts/choices/dnd'
import { ORGANISATIONS } from '../../consts/choices/astarus'
import { PRONOUNS } from '../../consts/choices/pronouns'
import { GradientColours } from '../Gradient'

export interface Character {
  affiliation: {
    division: string,
    group: string,
    iconURL: string,
    organisation: typeof ORGANISATIONS[number] | '',
    rank: string,
  },
  avatar: {
    gradientColours: GradientColours,
    smallURL: string,
    largeURL: string,
  },
  class: typeof CLASSES[number] | '',
  id: string,
  name: {
    displayName: string,
    realName: string,
  },
  pronouns: typeof PRONOUNS[number] | '',
  race: typeof RACES[number] | '',
}
