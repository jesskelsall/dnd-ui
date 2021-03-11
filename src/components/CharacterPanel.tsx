import React from 'react'

export interface CharacterPanelProps {
  avatarURL?: string,
  details?: string,
  name: string,
  nameScale?: number,
  organisationURL?: string,
  subheading?: string,
}

export const CharacterPanel = ({
  avatarURL,
  details,
  name,
  nameScale = 1,
  organisationURL,
  subheading,
}: CharacterPanelProps): JSX.Element => (
  <div className="character-panel">
    {avatarURL && <div className="character-panel-avatar shadow" />}
    <div className="character-panel-block shadow" />
    <div className="character-panel-block" />
    <div className="character-panel-text">
      <h1 style={{ fontSize: `${nameScale}em` }}>{name}</h1>
      {subheading && <h2>{subheading}</h2>}
      {details && <h3>{details}</h3>}
    </div>
    {avatarURL && <img alt="Avatar" className="character-panel-avatar" src={avatarURL} />}
    {organisationURL && (
      <img alt="Organisation" className="character-panel-organisation" src={organisationURL} />
    )}
  </div>
)
