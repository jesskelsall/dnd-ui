import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { dateToClock, dateToSeconds } from '../../functions/time'

export interface TimerCardProps {
  target?: string,
}

export const TimerCard = ({
  target,
}: TimerCardProps): JSX.Element | null => {
  if (!target) return null

  const [timeLeft, setTimeLeft] = useState<string>(dateToClock(target))

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeLeft(dateToClock(target))
    }, 1000)

    return () => clearTimeout(timeout)
  })

  const seconds = dateToSeconds(target)

  return (
    <div className="timer-card">
      {/* Shadows */}
      <div className="timer-card__box shadow" />

      {/* Elements */}
      <div
        className={classNames('timer-card__box', {
          danger: seconds <= 15,
          done: seconds === 0,
          warning: seconds <= 30,
        })}
      >
        <h1>{timeLeft}</h1>
      </div>
    </div>
  )
}
