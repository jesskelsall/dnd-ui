import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  flow, set, unset, update,
} from 'lodash/fp'
import { setScreen, setStore } from '../actions'
import { CHARACTER_TEMPLATE, DATA_SETS_TEMPLATE } from '../consts'
import { Character, DataSets } from '../types'

const initialState: DataSets = DATA_SETS_TEMPLATE

const updateCharacters = update('control.characters')

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    createCharacter: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const character = set('id', id, CHARACTER_TEMPLATE)
      return updateCharacters(set(id, character), state)
    },
    deleteCharacter: (state, action: PayloadAction<string>) => updateCharacters(
      unset(action.payload),
      state,
    ),
    duplicateCharacter: (state, action: PayloadAction<{
      existingId: string,
      newId: string,
    }>) => {
      const { existingId, newId } = action.payload
      const existingCharacter = state.control.characters[existingId]
      const newCharacter = set('id', newId, existingCharacter)
      return updateCharacters(set(newId, newCharacter), state)
    },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(setScreen, (state, action) => set('control.screen', action.payload, state))
      .addCase(setStore, (state, action) => action.payload.data)
      // Propagates all changes from control to display (real time updates).
      .addMatcher(() => true, (state) => set('display', state.control, state))
  },
})

export const dataReducer = dataSlice.reducer

export const {
  createCharacter,
  deleteCharacter,
  duplicateCharacter,
  updateCharacter,
} = dataSlice.actions

/**
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
