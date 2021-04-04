import { startCase } from 'lodash/fp'
import { Character } from '../types/Character'
import { Choice } from '../types/Choice'
import { Line, LineTransformer } from '../types/Line'

export const joinLineTransformers = (
  transformers: LineTransformer[],
  separator = ' ',
): LineTransformer => (
  character: Character,
) => transformers
  .map((transformer) => transformer(character))
  .filter((linePart) => linePart)
  .join(separator)

export const linesToChoices = (lines: Line[]): Choice<Line>[] => lines.map((line) => ({
  label: startCase(line),
  value: line,
}))
