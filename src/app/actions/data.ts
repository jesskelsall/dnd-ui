import { createAction } from '@reduxjs/toolkit'
import { Data } from '../types/Data'

export const setData = createAction<Data>('setData')
