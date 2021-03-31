import React from 'react'
import { useSelector } from 'react-redux'
import { selectScreen } from '../../selectors'
import { CardsGridScreen } from '../display/screens/CardsGridScreen'
import { HeroCardScreen } from '../display/screens/HeroCardScreen'
import { InitiativeTowerScreen } from '../display/screens/InitiativeTowerScreen'

export const DisplayArea = (): JSX.Element => {
  const screen = useSelector(selectScreen)

  return (
    <div className="area display-area">
      {screen.type === 'cardsGrid' && <CardsGridScreen />}
      {screen.type === 'heroCard' && <HeroCardScreen />}
      {screen.type === 'initiativeTower' && <InitiativeTowerScreen />}
    </div>
  )
}
