import { InitiativeParticipant, Turn } from '../types/InitiativeTower'

export const isActiveTurn = (turn: Turn): boolean => turn.round > 0

export const participantInitiative = (
  participant: InitiativeParticipant,
): number => participant.initiative || 0

export const getNextTurn = (
  participants: InitiativeParticipant[],
  turn: Turn,
): Turn => {
  if (!participants.length) {
    return {
      initiative: 0,
      round: turn.round,
    }
  }

  const sortedParticipants = participants.sort(
    (a, b) => participantInitiative(b) - participantInitiative(a),
  )
  const nextParticipants = participants
    .filter((participant) => participantInitiative(participant) < turn.initiative)

  if (nextParticipants.length) {
    return {
      initiative: participantInitiative(nextParticipants[0]),
      round: turn.round,
    }
  }

  return {
    initiative: participantInitiative(sortedParticipants[0]),
    round: turn.round + 1,
  }
}
