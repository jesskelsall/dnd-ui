import { Character } from '../../app/types/Character'
import { Display } from './display'

export interface Data {
  characters: Record<string, Character>,
  display: Display,
}
