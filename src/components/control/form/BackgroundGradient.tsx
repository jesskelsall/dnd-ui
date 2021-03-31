import classNames from 'classnames'
import React from 'react'
import { GradientColours } from '../../../app/types/Gradient'

export interface BackgroundGradientProps {
  onClick: (gradientColours: GradientColours) => void,
  gradientColours: GradientColours,
  selected?: boolean,
}

export const BackgroundGradient = ({
  gradientColours,
  onClick,
  selected = false,
}: BackgroundGradientProps): JSX.Element => (
  <button
    className={classNames('background-gradient-tile', {
      selected,
    })}
    onClick={() => onClick(gradientColours)}
    style={{
      background: `linear-gradient(
        45deg,
        ${gradientColours[0]} 15%,
        ${gradientColours[1]} 50%,
        ${gradientColours[2]} 85%
      )`,
    }}
    type="button"
  />
)
