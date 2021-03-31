import { orderBy, toPairs } from 'lodash/fp'
import { CLASSES } from '../consts/choices'
import { CLASS_SEPARATOR } from '../consts/separators'
import { Class, Classes } from '../types/Class'
import { choiceName } from './choice'

interface ClassObject {
  name: string,
  level: number,
  value: string,
}

export const classesToSortedArray = (classes: Classes): ClassObject[] => {
  const classPairs = toPairs(classes) as [Class, number][]
  const classObjects: ClassObject[] = classPairs
    .map((classPair) => ({
      name: choiceName(classPair[0], CLASSES),
      level: classPair[1],
      value: classPair[0],
    }))
    .filter((classObject) => classObject.level)

  return orderBy(['level'], ['desc'], classObjects)
}

export const classesToList = (classes: Classes): string => classesToSortedArray(classes)
  .map((classObject) => classObject.name)
  .join(CLASS_SEPARATOR)

export const classesToListWithLevels = (classes: Classes): string => classesToSortedArray(classes)
  .map((classObject) => `${classObject.name} (${classObject.level})`)
  .join(' ')

export const classesToPrimaryClass = (classes: Classes): string => {
  const sortedClasses = classesToSortedArray(classes)
  if (!sortedClasses.length) return ''

  return sortedClasses[0].value
}
