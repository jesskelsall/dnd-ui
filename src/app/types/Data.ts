import { CardsGrid } from './CardsGrid'
import { Characters } from './Character'
import { HeroCard } from './HeroCard'
import { InitiativeTower } from './InitiativeTower'
import { Screen } from './Screen'

export interface Data {
  cardsGrid: CardsGrid,
  characters: Characters,
  heroCard: HeroCard,
  initiativeTower: InitiativeTower,
  screen: Screen,
}

export type DataType = 'control' | 'display'

export type DataSets = Record<DataType, Data>
