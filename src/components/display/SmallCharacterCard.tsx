import React from 'react'
import { Avatar, AvatarProps } from '../../app/components/display/Avatar'

export interface SmallCharacterCardProps {
  avatar: AvatarProps,
  iconURL: string,
  textPrimary: string,
  textPrimaryScale: number,
  textSecondary: string,
  textTertiary: string,
}

export const SmallCharacterCard = ({
  avatar,
  iconURL,
  textPrimary,
  textPrimaryScale,
  textSecondary,
  textTertiary,
}: SmallCharacterCardProps): JSX.Element => {
  const hasAvatar = avatar.url

  return (
    <div className="character-card character-card-small">
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
        {iconURL && <img alt="icon" className="character-card__icon" src={iconURL} />}
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
