import React from 'react'

export interface CharacterPanelProps {
  avatarURL: string,
  details?: string,
  name: string,
  organisationURL?: string,
  subheading?: string,
}

export const CharacterPanel = ({
  avatarURL,
  details,
  name,
  organisationURL,
  subheading,
}: CharacterPanelProps): JSX.Element => (
  <div>
    <div>
      <h1>{name}</h1>
      {subheading && <h2>{subheading}</h2>}
      {details && <h3>{details}</h3>}
    </div>
    <img alt="Avatar" src={avatarURL} />
    {organisationURL && <img alt="Organisation" src={organisationURL} />}
  </div>
)
