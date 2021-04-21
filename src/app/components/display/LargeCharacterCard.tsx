import React from 'react'
import { RACES, RANKS } from '../../consts'
import { choiceName } from '../../functions'
import {
  Affiliation, CustomCSSProperties, Name, Player,
} from '../../types'
import { Avatar, AvatarProps } from './Avatar'

export interface LargeCharacterCardProps {
  affiliation?: Affiliation,
  avatar: AvatarProps,
  classes: string,
  name: Name,
  player?: Player,
  pronouns: string,
  race: string,
}

export const LargeCharacterCard = ({
  affiliation,
  avatar,
  classes,
  name,
  player,
  pronouns,
  race,
}: LargeCharacterCardProps): JSX.Element => (
  <div className="character-card character-card-large" style={{ '--name-scale': name.scale } as CustomCSSProperties}>
    {/* Shadows */}
    <div className="character-card-large__box shadow" />
    <div className="character-card-large__avatar shadow" />

    {/* Elements */}
    <div className="character-card-large__box">
      <div className="character-card-large__text">
        <div className="grouping">
          <h1>{name.name}</h1>
          {pronouns && <h3>{pronouns}</h3>}
          {race && <h3>{choiceName(race, RACES)}</h3>}
          {classes && <h3>{classes}</h3>}
        </div>

        {affiliation && (
          <div className="grouping">
            <h2>{choiceName(affiliation.rank, RANKS)}</h2>
            <h3>{affiliation.division}</h3>
            <h3>{affiliation.group}</h3>
            {affiliation.iconURL && (
              <img alt="icon" className="character-card-large__icon" src={affiliation.iconURL} />
            )}
          </div>
        )}

        {player && (
          <div className="grouping">
            <h2>{player.name.name}</h2>
            <h3>{player.pronouns}</h3>
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
