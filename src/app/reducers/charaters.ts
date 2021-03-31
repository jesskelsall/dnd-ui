import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  flow, set, unset,
} from 'lodash/fp'
import { setData } from '../actions/data'
import { Character, Characters } from '../types/Character'

const initialState: Characters = {}

interface CharacterPayload {
  character: Character,
  id: string,
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacter: (state, {
      payload: { character, id },
    }: PayloadAction<CharacterPayload>) => set(id, character, state),
    removeCharacter: (state, action: PayloadAction<string>) => unset(action.payload, state),
    updateCharacter: (state, {
      payload: { character, id },
    }: PayloadAction<CharacterPayload>) => flow(
      unset(id),
      set(character.id, character),
    )(state),
  },
  extraReducers: (builder) => {
    builder.addCase(setData, (state, action) => action.payload.characters)
  },
})

export const charactersReducer = charactersSlice.reducer

export const { addCharacter, removeCharacter, updateCharacter } = charactersSlice.actions
