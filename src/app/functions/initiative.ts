import { Character } from '../types'
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

export const getParticipantName = (
  participant: InitiativeParticipant,
  character: Character,
  participants: InitiativeParticipant[],
): string => {
  const characterName = participant.show.status
    ? character.names.real.name : character.names.display.name

  const characterParticipants = participants
    .filter((pt) => pt.characterId === character.id)

  if (characterParticipants.length < 2) return characterName

  const participantIndex = characterParticipants
    .findIndex((pt) => pt.id === participant.id)

  const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(participantIndex)

  return `${characterName} (${letter})`
}
