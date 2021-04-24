import React from 'react'
import { CustomCSSProperties } from '../../types'
import { Avatar, AvatarProps } from './Avatar'

export interface SmallCharacterCardProps {
  avatar: AvatarProps,
  icon: string,
  textPrimary: string,
  textPrimaryScale: number,
  textSecondary: string,
  textTertiary: string,
}

export const SmallCharacterCard = ({
  avatar,
  icon,
  textPrimary,
  textPrimaryScale,
  textSecondary,
  textTertiary,
}: SmallCharacterCardProps): JSX.Element => {
  const hasAvatar = avatar.url

  return (
    <div
      className="character-card character-card-small"
      style={{ '--name-scale': textPrimaryScale } as CustomCSSProperties}
    >
      {/* Shadows */}
      <div className="character-card__box shadow" />
      {hasAvatar && <div className="character-card__avatar shadow" />}

      {/* Elements */}
      <div className="character-card__box">
        <div className="character-card__text">
          <h1>{textPrimary}</h1>
          {textSecondary && <h2>{textSecondary}</h2>}
          {textTertiary && <h3>{textTertiary}</h3>}
        </div>
        {icon && <img alt="icon" className="character-card__icon" src={icon} />}
      </div>
      {hasAvatar && (
        <div className="character-card__avatar">
          <Avatar
            backgroundGradientColours={avatar.backgroundGradientColours}
            url={avatar.url}
          />
        </div>
      )}
    </div>
  )
}
