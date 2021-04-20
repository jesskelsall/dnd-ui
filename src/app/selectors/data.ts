import { createSelector } from '@reduxjs/toolkit'
import { isEqual, orderBy, sortBy } from 'lodash/fp'
import { nextTurn } from '../functions'
import { RootState } from '../store'
import {
  Character, Characters, Data, InitiativeParticipant, InitiativeTower, Screen, Turn,
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

// Initiative

export const selectInitiativeTower = (data: Data): InitiativeTower => data.initiativeTower

export const selectInitiativeParticipants = (
  data: Data,
): InitiativeParticipant[] => orderBy(['initiative'], ['desc'], data.initiativeTower.participants)

export const selectInitiativeTurn = (data: Data): Turn => data.initiativeTower.turn

export const selectInitiativeIsActive = (data: Data): boolean => data.initiativeTower.turn.round > 0

export const selectInitiativeNextPlayerTurn = createSelector(
  selectCharacters,
  selectInitiativeParticipants,
  selectInitiativeTurn,
  (characters, participants, turn) => {
    const playerParticipants = participants.filter((participant) => {
      const character = characters[participant.characterId]
      return character.player.name.name
    })

    return nextTurn(playerParticipants, turn)
  },
)

export const selectInitiativeHasParticipants = createSelector(
  selectInitiativeParticipants,
  (participants) => participants.length > 0,
)

// Screen

export const selectScreen = (data: Data): Screen => data.screen
