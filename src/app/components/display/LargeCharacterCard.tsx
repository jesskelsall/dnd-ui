import React from 'react'
import { RACES, RANKS } from '../../consts'
import { choiceName } from '../../functions'
import {
  Affiliation, CustomCSSProperties, Icons, Name, Player,
} from '../../types'
import { Avatar, AvatarProps } from './Avatar'

export interface LargeCharacterCardProps {
  affiliation?: Affiliation,
  avatar: AvatarProps,
  classes: string,
  icons: Icons,
  name: Name,
  player?: Player,
  pronouns: string,
  race: string,
}

export const LargeCharacterCard = ({
  affiliation,
  avatar,
  classes,
  icons,
  name,
  player,
  pronouns,
  race,
}: LargeCharacterCardProps): JSX.Element => {
  const renderIfValue = (value: string, tag: string): JSX.Element | null => (value
    ? React.createElement(tag, null, value) : null)

  return (
    <div className="character-card character-card-large" style={{ '--name-scale': name.scale } as CustomCSSProperties}>
      {/* Shadows */}
      <div className="character-card-large__box shadow" />
      <div className="character-card-large__avatar shadow" />

      {/* Elements */}
      <div className="character-card-large__box">
        <div className="character-card-large__text">
          <div className="grouping">
            <h1>{name.name}</h1>
            {renderIfValue(pronouns, 'h3')}
            {race && <h3>{choiceName(race, RACES)}</h3>}
            {renderIfValue(classes, 'h3')}
          </div>

          {affiliation && (
          <div className="grouping">
            {affiliation.rank && <h2>{choiceName(affiliation.rank, RANKS)}</h2>}
            {renderIfValue(affiliation.division, 'h3')}
            {renderIfValue(affiliation.group, 'h3')}
            {(affiliation.rank || affiliation.god) && (
              <div className="character-card-large__icons">
                {affiliation.rank && (
                <img alt="icon" className="character-card-large__icon" src={icons.rank} />
                )}
                {affiliation.god && (
                <img alt="icon" className="character-card-large__icon" src={icons.god} />
                )}
              </div>
            )}
          </div>
          )}

          {player && (
          <div className="grouping">
            {renderIfValue(player.name.name, 'h2')}
            {renderIfValue(player.pronouns, 'h3')}
            {renderIfValue(player.discordName.name, 'h3')}
            {player.discordURL && (
              <img alt="avatar" className="character-card-large__discord" src={player.discordURL} />
            )}
          </div>
          )}
        </div>
      </div>
      <div className="character-card-large__avatar">
        <Avatar
          backgroundGradientColours={avatar.backgroundGradientColours}
          height={600}
          linearGradient
          url={avatar.url}
          width={352}
        />
      </div>
    </div>
  )
}
