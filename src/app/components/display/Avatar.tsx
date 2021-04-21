import React from 'react'
import { createLinearGradient, createRadialGradient } from '../../functions/gradient'
import { GradientColours } from '../../types/Gradient'

export interface AvatarProps {
  backgroundGradientColours?: GradientColours
  height?: number,
  linearGradient?: boolean,
  size?: number,
  url: string,
  width?: number,
}

export const Avatar = ({
  backgroundGradientColours,
  height,
  linearGradient = false,
  size = 100,
  url,
  width,
}: AvatarProps): JSX.Element => {
  const createGradient = linearGradient ? createLinearGradient : createRadialGradient
  const background = backgroundGradientColours
    ? createGradient(backgroundGradientColours)
    : undefined

  return (
    <img
      alt="avatar"
      src={url}
      style={{
        background,
        height: height || size,
        width: width || size,
      }}
    />
  )
}
