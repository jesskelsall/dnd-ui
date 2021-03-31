import React from 'react'
import { Character } from '../../app/types/Character'
import { DisplayCharacter } from '../../types/data/displayCharacter'

export interface CharacterDisplayProps {
  character: Character,
  displayCharacter: DisplayCharacter,
}

export const CharacterDisplay = ({
  character,
  displayCharacter,
}: CharacterDisplayProps): JSX.Element => <div />
