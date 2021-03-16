import { Gradient, GradientColours, GradientShape } from '../types/Gradient'

export const createGradient = (
  shape: GradientShape,
  colours: GradientColours,
): Gradient => `${shape}-gradient(farthest-corner, ${colours.join(', ')})`
