import { Choice, ChoiceWithPath } from '../types/Choice'

export const arrayToChoices = <V extends string = string>(
  array: [V, string][],
): Choice<V>[] => array.map(([value, label]) => ({ label, value }))

export const arrayToChoicesWithPaths = (
  array: string[][],
): ChoiceWithPath[] => array.map(([value, label, path]) => ({
  label, path, value,
}))

export const choiceName = <V extends string = string>(
  value: string,
  choices: Choice<V>[],
): string => {
  const valueChoice = choices.find((choice) => choice.value === value)
  return valueChoice ? valueChoice.label : ''
}

export const choicesToValues = <V extends string = string>(
  choices: Choice<V>[],
): V[] => choices.map((choice) => choice.value)

export const valuesToChoices = <V extends string = string>(
  choices: Choice<V>[],
  values: V[],
): Choice<V>[] => choices.filter((choice) => values.includes(choice.value))
