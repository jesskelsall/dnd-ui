export type ParticipantStatus = 'healthy' | 'wounded' | 'unconscious' | 'dead'

export type ParticipantTurn = 'inactive' | 'nextPlayer' | 'active'

export interface InitiativeParticipant {
  characterId: string,
  health: {
    current: number,
    max: number,
    temp: number,
  },
  id: string,
  initiative?: number,
  quantity: number,
  show: {
    details: boolean,
    quantity: boolean,
    status: boolean,
  },
  status: {
    dead: boolean,
    unconscious: boolean,
  },
}

export type InitiativeParticipants = Record<string, InitiativeParticipant>

export interface Turn {
  initiative: number,
  round: number,
}

export interface InitiativeTower {
  participants: InitiativeParticipants,
  turn: Turn,
}
