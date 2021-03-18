import React from 'react'
import { createGradient } from '../../functions/createGradient'
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
  const background = backgroundGradientColours ? createGradient('radial', backgroundGradientColours) : undefined

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
