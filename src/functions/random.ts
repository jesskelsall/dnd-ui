import { customAlphabet } from 'nanoid'
import { RANDOM_CHARACTERS, RANDOM_ID_LENGTH } from '../consts/random'

const RANDOM_HEX = customAlphabet(RANDOM_CHARACTERS, RANDOM_ID_LENGTH)

export const randomId = (): string => RANDOM_HEX()
