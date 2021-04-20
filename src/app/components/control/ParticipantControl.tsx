import React from 'react'
import { Character, InitiativeParticipant, Turn } from '../../types'

export interface ParticipantControlProps {
  character: Character,
  // onDelete: () => void,
  // onUpdate: (participant: InitiativeParticipant) => void,
  participant: InitiativeParticipant,
  turn: Turn,
}

export const ParticipantControl = ({
  character,
  // onDelete,
  // onUpdate,
  participant,
  turn,
}: ParticipantControlProps): JSX.Element => (
  <div className="card">
    <div className="card-header">
      {character.names.real.name}
    </div>
  </div>
)
