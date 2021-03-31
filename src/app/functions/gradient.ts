import { Gradient, GradientColours } from '../types/Gradient'

export const createLinearGradient = (
  colours: GradientColours,
): Gradient => `linear-gradient(to bottom, ${colours.join(', ')})`

export const createRadialGradient = (
  colours: GradientColours,
): Gradient => `radial-gradient(farthest-corner, ${colours[0]} 25%, ${colours[1]}, ${colours[2]})`
