import { createAction } from '@reduxjs/toolkit'
import { Screen, Store } from '../types'

export const setScreen = createAction<Screen>('setScreen')

export const setStore = createAction<Store>('setStore')
