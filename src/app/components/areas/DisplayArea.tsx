import React from 'react'
import { useSelector } from 'react-redux'
import { selectDisplayData, selectScreen } from '../../selectors'
import { CardsGridScreen } from '../display/screens/CardsGridScreen'
import { HeroCardScreen } from '../display/screens/HeroCardScreen'
import { InitiativeTowerScreen } from '../display/screens/InitiativeTowerScreen'

export const DisplayArea = (): JSX.Element => {
  const data = useSelector(selectDisplayData)
  const screen = selectScreen(data)

  return (
    <div className="area display-area">
      {screen === 'cardsGrid' && (
        <CardsGridScreen
          cardsGrid={data.cardsGrid}
          characters={data.characters}
        />
      )}
      {screen === 'heroCard' && (
        <HeroCardScreen
          characters={data.characters}
          heroCard={data.heroCard}
        />
      )}
      {screen === 'initiativeTower' && <InitiativeTowerScreen />}
    </div>
  )
}
