export type ScreenType = 'cardsGrid' | 'heroCard' | 'initiativeTower'

export interface GenericScreen {
  type: ScreenType,
}

export interface CardsGridScreen extends GenericScreen {
  type: 'cardsGrid',
}

export interface HeroCardScreen extends GenericScreen {
  type: 'heroCard',
}

export interface InitiativeTowerScreen extends GenericScreen {
  type: 'initiativeTower',
}

export type Screen = CardsGridScreen | HeroCardScreen | InitiativeTowerScreen
