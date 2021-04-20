import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectCharacters,
  selectDisplayData,
  selectInitiativeIsActive,
  selectInitiativeNextPlayerTurn,
  selectInitiativeParticipants,
  selectInitiativeTurn,
} from '../../../selectors'
import { ParticipantTurn } from '../../../types'
import { AvatarProps } from '../Avatar'
import { ParticipantCard } from '../ParticipantCard'

export const InitiativeTowerScreen = (): JSX.Element | null => {
  // const avatar: AvatarProps = {
  //   backgroundGradientColours: [
  //     '#40a1cf',
  //     '#44d0a4',
  //     '#39b54a',
  //   ],
  //   url: 'https://raw.githubusercontent.com/jesskelsall/astarus-images/main/people/tokens/3840bf1d6c005683.png',
  // }

  const data = useSelector(selectDisplayData)

  const isActive = selectInitiativeIsActive(data)
  if (!isActive) return null

  const characters = selectCharacters(data)
  const participants = selectInitiativeParticipants(data)
  const turn = selectInitiativeTurn(data)
  const nextPlayerTurn = selectInitiativeNextPlayerTurn(data)

  return (
    <div className="page page-center" style={{ gap: 10 }}>
      {participants.map((participant) => {
        const character = characters[participant.characterId]
        let participantTurn: ParticipantTurn = 'inactive'

        if (nextPlayerTurn.initiative === participant.initiative) participantTurn = 'nextPlayer'
        if (turn.initiative === participant.initiative) participantTurn = 'active'

        return (
          <ParticipantCard
            avatar={{
              backgroundGradientColours: character.avatar.gradientColours,
              url: character.avatar.smallURL,
            }}
            initiative={participant.initiative}
            key={participant.id}
            status="healthy"
            text={character.names.real.name}
            textScale={character.names.real.scale}
            turn={participantTurn}
          />
        )
      })}
      {/* <ParticipantCard
        avatar={avatar}
        initiative={20}
        status="healthy"
        text="Healthy"
        textScale={1}
        turn="inactive"
      />
      <ParticipantCard
        avatar={avatar}
        initiative={17}
        status="wounded"
        text="Wounded"
        textScale={1}
        turn="inactive"
      />
      <ParticipantCard
        avatar={avatar}
        initiative={14}
        status="unconscious"
        text="Unconscious"
        textScale={1}
        turn="inactive"
      />
      <ParticipantCard
        avatar={avatar}
        initiative={11}
        status="dead"
        text="Dead"
        textScale={1}
        turn="inactive"
      />
      <ParticipantCard
        avatar={avatar}
        initiative={8}
        status="healthy"
        text="Active Turn"
        textScale={1}
        turn="active"
      />
      <ParticipantCard
        avatar={avatar}
        initiative={5}
        status="healthy"
        text="Next Player Turn"
        textScale={1}
        turn="nextPlayer"
      />
      <ParticipantCard
        avatar={{ url: '' }}
        initiative={2}
        status="healthy"
        text="No Avatar"
        textScale={1}
        turn="inactive"
      />
      <ParticipantCard
        avatar={avatar}
        status="healthy"
        text="No Initiative"
        textScale={1}
        turn="inactive"
      />
      <ParticipantCard
        avatar={{
          ...avatar,
          url: 'https://raw.githubusercontent.com/jesskelsall/astarus-images/main/people/tokens/41e0b0962f18eb6b.png',
        }}
        status="healthy"
        text="Sparrow on the Autumn Pine"
        textScale={0.9}
        turn="inactive"
      /> */}
    </div>
  )
}
