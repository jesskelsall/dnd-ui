export const numberToDNDModifier = (number: number): string => {
  const sign = number < 0 ? '-' : '+'
  return `${sign}${Math.abs(number)}`
}
