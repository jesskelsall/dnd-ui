import { Choice, ChoiceWithPath } from '../types/Choice'

export const arrayToChoices = (
  array: string[],
): Choice[] => array.map((item) => ({
  name: item,
  value: item,
}))

export const arrayToChoicesWithPaths = (
  array: string[][],
): ChoiceWithPath[] => array.map((item) => ({
  name: item[0],
  path: item[1],
  value: item[0],
}))
