import { padStart } from 'lodash/fp'
import { DateTime } from 'luxon'

export const secondsToDate = (
  seconds: number,
): string => DateTime.now().plus({ seconds }).toISO()

export const dateToSeconds = (
  date: string,
): number => {
  const startDate = DateTime.now()
  const endDate = DateTime.fromISO(date)

  const diff = endDate.diff(startDate, 'seconds')
  return Math.max(0, Math.round(diff.seconds))
}

export const dateToClock = (
  date: string,
): string => {
  const seconds = dateToSeconds(date)

  const displayMinutes = Math.floor(seconds / 60)
  const displaySeconds = padStart(2, (seconds % 60).toString()).replace(' ', '0')

  return `${displayMinutes}:${displaySeconds}`
}
