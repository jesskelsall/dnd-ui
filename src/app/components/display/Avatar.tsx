import React from 'react'
import { createRadialGradient } from '../../functions/gradient'
import { GradientColours } from '../../types/Gradient'

export interface AvatarProps {
  backgroundGradientColours?: GradientColours
  size?: number,
  url: string,
}

export const Avatar = ({
  backgroundGradientColours,
  size = 100,
  url,
}: AvatarProps): JSX.Element => {
  const background = backgroundGradientColours
    ? createRadialGradient(backgroundGradientColours)
    : undefined

  return (
    <img
      alt="avatar"
      src={url}
      style={{
        background,
        height: size,
        width: size,
      }}
    />
  )
}
