import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectCardsGrid,
  selectCardsGridColumns, selectCharacters, selectDisplayData, selectHeroCard, selectScreen,
} from '../../selectors'
import { CardsGridScreen } from '../display/screens/CardsGridScreen'
import { HeroCardScreen } from '../display/screens/HeroCardScreen'
import { InitiativeTowerScreen } from '../display/screens/InitiativeTowerScreen'

export const DisplayArea = (): JSX.Element => {
  const data = useSelector(selectDisplayData)
  const screen = selectScreen(data)
  const characters = selectCharacters(data)
  const cardsGrid = selectCardsGrid(data)
  const cardsGridColumns = selectCardsGridColumns(data)
  const heroCard = selectHeroCard(data)

  return (
    <div className="area display-area">
      {screen === 'cardsGrid' && (
        <CardsGridScreen
          characters={characters}
          columns={cardsGridColumns}
          details={cardsGrid.details}
        />
      )}
      {screen === 'heroCard' && (
        <HeroCardScreen
          characters={characters}
          heroCard={heroCard}
        />
      )}
      {screen === 'initiativeTower' && (
        <InitiativeTowerScreen />
      )}
    </div>
  )
}
