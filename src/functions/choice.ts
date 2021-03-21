import { Choice, ChoiceWithPath } from '../types/Choice'

export const arrayToChoices = (
  array: string[][],
): Choice[] => array.map(([value, name]) => ({ name, value }))

export const arrayToChoicesWithPaths = (
  array: string[][],
): ChoiceWithPath[] => array.map(([value, name, path]) => ({
  name, path, value,
}))

export const choiceName = (
  value: string,
  choices: Choice[],
): string => {
  const valueChoice = choices.find((choice) => choice.value === value)
  return valueChoice ? valueChoice.name : ''
}
