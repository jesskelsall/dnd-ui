import { createSelector } from '@reduxjs/toolkit'
import {
  chunk, isEqual, orderBy, sortBy,
} from 'lodash/fp'
import { getNextTurn } from '../functions'
import { RootState } from '../store'
import {
  CardsGrid,
  Character,
  Characters,
  Data,
  GridCard,
  HeroCard,
  InitiativeParticipant,
  InitiativeTower,
  Screen,
  Timer,
  Turn,
} from '../types'

// Real time

export const selectRealTime = (state: RootState): boolean => state.data.realTime

export const selectChangesToApply = (
  state: RootState,
): boolean => !isEqual(state.data.control, state.data.display)

// Select data from store

export const selectControlData = (state: RootState): Data => state.data.control
export const selectDisplayData = (state: RootState): Data => state.data.display

// Select values from data

// Characters

export const selectCharacters = (data: Data): Characters => data.characters

export const selectCharactersList = (data: Data): Character[] => sortBy('names.real.name', data.characters)

// Cards Grid

export const selectCardsGrid = (data: Data): CardsGrid => data.cardsGrid

export const selectCardsGridColumns = (data: Data): GridCard[][] => {
  const visibleCards = data.cardsGrid.cards.filter((card) => card.visible)
  return chunk(4, visibleCards)
}

// Hero Card

export const selectHeroCard = (data: Data): HeroCard => data.heroCard

// Initiative

export const selectInitiativeTower = (data: Data): InitiativeTower => data.initiativeTower

export const selectInitiativeParticipants = (
  data: Data,
): InitiativeParticipant[] => orderBy(['initiative'], ['desc'], data.initiativeTower.participants)

export const selectInitiativeVisibleParticipants = createSelector(
  selectInitiativeParticipants,
  (participants) => participants.filter((participant) => participant.show.details),
)

export const selectInitiativeTimer = (data: Data): Timer => data.initiativeTower.timer

export const selectInitiativeTurn = (data: Data): Turn => data.initiativeTower.turn

export const selectInitiativeNextPlayerTurn = createSelector(
  selectCharacters,
  selectInitiativeParticipants,
  selectInitiativeTurn,
  (characters, participants, turn) => {
    const playerParticipants = participants.filter((participant) => {
      const character = characters[participant.characterId]
      return character.player.name.name
    })

    return getNextTurn(playerParticipants, turn)
  },
)

export const selectInitiativeHasParticipants = createSelector(
  selectInitiativeParticipants,
  (participants) => participants.length > 0,
)

// Screen

export const selectScreen = (data: Data): Screen => data.screen
