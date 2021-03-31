import { Character } from '../types/Character'
import { LineTransformer } from '../types/Line'

export const joinLineTransformers = (
  transformers: LineTransformer[],
  separator = ' ',
): LineTransformer => (
  character: Character,
) => transformers
  .map((transformer) => transformer(character))
  .filter((linePart) => linePart)
  .join(separator)
