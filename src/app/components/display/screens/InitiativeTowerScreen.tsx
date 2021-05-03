import React from 'react'
import { useSelector } from 'react-redux'
import { getParticipantName, isActiveTurn } from '../../../functions'
import {
  selectCharacters,
  selectDisplayData,
  selectInitiativeNextPlayerTurn,
  selectInitiativeVisibleParticipants,
  selectInitiativeTimer,
  selectInitiativeTurn,
} from '../../../selectors'
import { ParticipantStatus, ParticipantTurn } from '../../../types'
import { ParticipantCard } from '../ParticipantCard'
import { TimerCard } from '../TimerCard'

export const InitiativeTowerScreen = (): JSX.Element | null => {
  const data = useSelector(selectDisplayData)

  const isActive = isActiveTurn(data.initiativeTower.turn)
  if (!isActive) return null

  const characters = selectCharacters(data)
  const participants = selectInitiativeVisibleParticipants(data)
  const timer = selectInitiativeTimer(data)
  const turn = selectInitiativeTurn(data)
  const nextPlayerTurn = selectInitiativeNextPlayerTurn(data)

  return (
    <div className="screen screen-bottom-right">
      <div className="screen-column">
        {participants.map((participant) => {
          const character = characters[participant.characterId]
          const characterName = getParticipantName(participant, character, participants)

          let participantTurn: ParticipantTurn = 'inactive'
          let status: ParticipantStatus = 'healthy'

          if (character.player.name.name && nextPlayerTurn.initiative === participant.initiative) participantTurn = 'nextPlayer'
          if (turn.initiative === participant.initiative) participantTurn = 'active'

          if (participant.health.current / participant.health.max <= 0.5) status = 'wounded'
          if (participant.status.unconscious) status = 'unconscious'
          if (participant.status.dead) status = 'dead'

          return (
            <ParticipantCard
              avatar={{
                backgroundGradientColours: character.avatar.gradientColours,
                url: character.avatar.smallURL,
              }}
              initiative={participant.initiative ? Math.floor(participant.initiative) : undefined}
              key={participant.id}
              status={status}
              text={characterName}
              textScale={character.names.real.scale}
              turn={participantTurn}
            />
          )
        })}
      </div>
      <div className="screen-column">
        <TimerCard target={timer.target} />
      </div>
    </div>
  )
}
