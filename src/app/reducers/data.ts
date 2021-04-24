import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  flow, reject, set, unset, update, values,
} from 'lodash/fp'
import { setScreen, setStore } from '../actions'
import {
  CHARACTER_TEMPLATE,
  DATA_SETS_TEMPLATE,
  GRID_CARD_TEMPLATE,
  INITIATIVE_PARTICIPANT_TEMPLATE,
  INITIATIVE_TOWER_TEMPLATE,
} from '../consts'
import { getNextTurn, randomId } from '../functions'
import { secondsToDate } from '../functions/time'
import {
  CardsGridDetails,
  Character, DataSets, GridCard, InitiativeParticipant, Timer,
} from '../types'

const initialState: DataSets = DATA_SETS_TEMPLATE

const updateCharacters = update('control.characters')
const updateInitiative = update('control.initiativeTower')
const updateParticipants = update('control.initiativeTower.participants')

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // CHARACTERS

    // Adds a new blank character with the given ID
    createCharacter: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const character = set('id', id, CHARACTER_TEMPLATE)
      return updateCharacters(set(id, character), state)
    },

    // Deletes an existing character
    deleteCharacter: (state, action: PayloadAction<string>) => updateCharacters(
      unset(action.payload),
      state,
    ),

    // Copies an existing character to a new given ID
    duplicateCharacter: (state, action: PayloadAction<{
      existingId: string,
      newId: string,
    }>) => {
      const { existingId, newId } = action.payload
      const existingCharacter = state.control.characters[existingId]
      const newCharacter = set('id', newId, existingCharacter)
      return updateCharacters(set(newId, newCharacter), state)
    },

    // Makes changes to an existing character
    // Can include changing the ID
    updateCharacter: (state, action: PayloadAction<{
      id: string,
      character: Character
    }>) => updateCharacters(
      flow(
        unset(action.payload.id),
        set(action.payload.character.id, action.payload.character),
      ),
      state,
    ),

    // CARDS GRID

    // Adds a new grid card to the end of the grid cards list
    addGridCard: (state, action: PayloadAction<string>) => set(
      'control.cardsGrid.cards',
      [...state.control.cardsGrid.cards, set('characterId', action.payload, GRID_CARD_TEMPLATE)],
      state,
    ),

    // Removes a specific grid card from the grid cards list by character ID
    deleteGridCard: (state, action: PayloadAction<string>) => update(
      'control.cardsGrid.cards',
      reject({ characterId: action.payload }),
      state,
    ),

    // Replaces the given grid card in the grid cards list
    setGridCard: (state, action: PayloadAction<GridCard>) => update(
      'control.cardsGrid.cards',
      (cards: GridCard[]) => cards.map((card) => {
        if (card.characterId === action.payload.characterId) return action.payload
        return card
      }),
      state,
    ),

    // Replaces the cards grid details object with the one provided
    setGridDetails: (state, action: PayloadAction<CardsGridDetails>) => set(
      'control.cardsGrid.details',
      action.payload,
      state,
    ),

    // HERO CARD

    // Sets the ID of the character to be displayed on the hero card
    setHeroCharacterId: (state, action: PayloadAction<string>) => set(
      'control.heroCard.characterId',
      action.payload,
      state,
    ),

    // INITIATIVE

    // Advances the initiative to the next participant in order
    // Wraps around to the next round if needed
    // Sets the timer target if configured
    advanceTurn: (state) => {
      const { initiativeTower } = state.control
      let target: string | undefined
      let nextTurn = getNextTurn(
        values(initiativeTower.participants),
        initiativeTower.turn,
      )

      // Between rounds - add a step between rounds for the timer
      if (initiativeTower.timer.betweenRounds && nextTurn.round > initiativeTower.turn.round) {
        target = secondsToDate(initiativeTower.timer.betweenRounds)
        nextTurn = { ...nextTurn, initiative: nextTurn.initiative + 1 }
      // Each turn
      } else if (initiativeTower.timer.eachTurn) {
        target = secondsToDate(initiativeTower.timer.eachTurn)
      }

      return update(
        'control.initiativeTower',
        flow(
          set('timer.target', target),
          set('turn', nextTurn),
        ),
        state,
      )
    },

    // Adds a new participant using the given character ID
    createParticipant: (state, action: PayloadAction<string>) => {
      const participantId = randomId()
      const character = state.control.characters[action.payload]

      const participant = flow(
        set('characterId', character.id),
        set('id', participantId),
        set('health.current', character.initiative.maxHealth),
        set('health.max', character.initiative.maxHealth),
      )(INITIATIVE_PARTICIPANT_TEMPLATE)

      return updateParticipants(set(participantId, participant), state)
    },

    // Deletes an existing participant
    deleteParticipant: (state, action: PayloadAction<string>) => updateParticipants(
      unset(action.payload),
      state,
    ),

    // Wipes the initiative tower, restoring it to its default state
    resetInitiativeTower: (state) => updateInitiative(() => INITIATIVE_TOWER_TEMPLATE, state),

    // Sets the initiative tower's timer properties
    setTimer: (state, action: PayloadAction<Timer>) => set('control.initiativeTower.timer', action.payload, state),

    // Makes changes to an existing participant
    updateParticipant: (state, action: PayloadAction<InitiativeParticipant>) => updateParticipants(
      set(action.payload.id, action.payload),
      state,
    ),

    // REAL TIME

    applyChanges: (state) => set('display', state.control, state),

    setRealTime: (state, action: PayloadAction<boolean>) => set('realTime', action.payload, state),
  },
  extraReducers: (builder) => {
    builder
      .addCase(setScreen, (state, action) => set('control.screen', action.payload, state))
      .addCase(setStore, (state, action) => action.payload.data)
      // Propagates all changes from control to display if applying real time updates.
      .addMatcher(() => true, (state) => (state.realTime ? set('display', state.control, state) : state))
  },
})

export const dataReducer = dataSlice.reducer

export const {
  addGridCard,
  advanceTurn,
  applyChanges,
  createCharacter,
  createParticipant,
  deleteCharacter,
  deleteGridCard,
  deleteParticipant,
  duplicateCharacter,
  resetInitiativeTower,
  setGridCard,
  setGridDetails,
  setHeroCharacterId,
  setRealTime,
  setTimer,
  updateCharacter,
  updateParticipant,
} = dataSlice.actions
