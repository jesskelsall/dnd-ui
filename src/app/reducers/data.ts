import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  flow, set, unset, update, values,
} from 'lodash/fp'
import { setScreen, setStore } from '../actions'
import {
  CHARACTER_TEMPLATE,
  DATA_SETS_TEMPLATE,
  INITIATIVE_PARTICIPANT_TEMPLATE,
  INITIATIVE_TOWER_TEMPLATE,
} from '../consts'
import { nextTurn, randomId } from '../functions'
import { Character, DataSets, InitiativeParticipant } from '../types'

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
    advanceTurn: (state) => updateInitiative(
      set('turn', nextTurn(
        values(state.control.initiativeTower.participants),
        state.control.initiativeTower.turn,
      )),
      state,
    ),

    // Adds a new participant using the given character ID
    createParticipant: (state, action: PayloadAction<string>) => {
      const participantId = randomId()
      const participant = flow(
        set('characterId', action.payload),
        set('id', participantId),
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
  applyChanges,
  advanceTurn,
  createCharacter,
  createParticipant,
  deleteCharacter,
  deleteParticipant,
  duplicateCharacter,
  resetInitiativeTower,
  setHeroCharacterId,
  setRealTime,
  updateCharacter,
  updateParticipant,
} = dataSlice.actions

/**
 * TODO
 * Notes for future Jess:
 *
 * Finish making each of the 3 new reducers
 * Assume everything is real-time for now
 * Add catch-all that applies control data directly to display data on any change
 * Write reducers that are more strict in their use:
 * - Less setting, more adding/removing/altering
 * - Should cover all the obvious actions
 *
 * Further ahead:
 *
 * Figure out how to make control -> display propagation dependent on realTime
 * Will require an at-will reducer to copy the data across
 * Catch all reducer needs to be able to select the realTime property from another slice
 */
