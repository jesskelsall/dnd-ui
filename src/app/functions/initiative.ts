import { InitiativeParticipant, Turn } from '../types/InitiativeTower'

export const nextTurn = (
  participants: InitiativeParticipant[],
  turn: Turn,
): Turn => {
  if (!participants.length) {
    return {
      initiative: 0,
      round: turn.round,
    }
  }

  const sortedParticipants = participants.sort((a, b) => b.initiative - a.initiative)
  const nextParticipants = participants
    .filter((participant) => participant.initiative < turn.initiative)

  if (nextParticipants.length) {
    return {
      initiative: nextParticipants[0].initiative,
      round: turn.round,
    }
  }

  return {
    initiative: sortedParticipants[0].initiative,
    round: turn.round + 1,
  }
}
