export interface InitiativeParticipant {
  characterId: string,
  id: string,
  initiative: number,
  show: {
    details: boolean,
    quantity: boolean,
    status: boolean,
  },
  status: {
    dead: boolean,
    health: number,
    unconscious: boolean,
  },
}

export type InitiativeParticipants = Record<string, InitiativeParticipant>

export interface InitiativeTower {
  initiative: number,
  participants: InitiativeParticipants,
  round: number,
}
