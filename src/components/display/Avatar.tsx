import React from 'react'
import { createGradient } from '../../functions/createGradient'
import { GradientColours } from '../../types/Gradient'

export interface AvatarProps {
  backgroundGradientColours?: GradientColours
  url: string,
}

export const Avatar = ({
  backgroundGradientColours,
  url,
}: AvatarProps): JSX.Element => {
  const background = backgroundGradientColours ? createGradient('radial', backgroundGradientColours) : undefined

  return (
    <img alt="avatar" src={url} style={{ background }} />
  )
}
