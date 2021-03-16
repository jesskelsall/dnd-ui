import React from 'react'
import './App.css'
import { SmallCharacterCard } from './components/display/SmallCharacterCard'
import { characters } from './stubs/character'

const App = (): JSX.Element => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }}
  >
    {Object.values(characters).map((character) => (
      <SmallCharacterCard
        avatar={{
          backgroundGradientColours: character.avatar.gradientColours,
          url: character.avatar.smallURL,
        }}
        iconURL={character.affiliation.iconURL}
        textPrimary={character.name.realName}
        textSecondary={`${character.race} ${character.class}`}
        textTertiary={character.pronouns}
      />
    ))}
  </div>
)

export default App
