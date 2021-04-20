import classNames from 'classnames'
import React from 'react'
import { CustomCSSProperties, ParticipantStatus, ParticipantTurn } from '../../types'
import { Avatar, AvatarProps } from './Avatar'

export interface ParticipantCardProps {
  avatar: AvatarProps,
  initiative?: number,
  status: ParticipantStatus,
  text: string,
  textScale: number,
  turn: ParticipantTurn,
}

export const ParticipantCard = ({
  avatar,
  initiative,
  status,
  text,
  textScale,
  turn,
}: ParticipantCardProps): JSX.Element => {
  const hasAvatar = avatar.url
  const hasInitiative = initiative !== undefined

  return (
    <div className="participant-card" style={{ '--name-scale': textScale } as CustomCSSProperties}>
      {/* Shadows */}
      <div className={classNames('participant-card__box shadow', {
        'no-initiative': !hasInitiative,
      })}
      />

      {/* Elements */}
      <div className={classNames('participant-card__box', {
        'no-initiative': !hasInitiative,
        'turn-active': turn === 'active',
        'turn-next-player': turn === 'nextPlayer',
      })}
      >
        {hasInitiative && <h2>{initiative}</h2>}
        <div className={classNames('participant-card__avatar', {
          'status-wounded': status === 'wounded',
          'status-unconscious': status === 'unconscious',
          'status-dead': status === 'dead',
        })}
        >
          {hasAvatar && (
            <Avatar
              backgroundGradientColours={avatar.backgroundGradientColours}
              size={60}
              url={avatar.url}
            />
          )}
        </div>
        <h1>{text}</h1>
      </div>
    </div>
  )
}
