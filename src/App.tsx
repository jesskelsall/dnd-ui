import React from 'react'
import './App.css'
import { CharacterEditor } from './components/control/CharacterEditor'
import { SmallCharacterCard } from './components/display/SmallCharacterCard'
import { characters } from './stubs/character'
import { Character } from './types/data/character'

const App = (): JSX.Element => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }}
  >
    {/* {Object.values(characters).map((character) => (
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
    ))} */}
    <CharacterEditor
      character={characters.ahsha}
      onSave={(character: Character) => console.info({ character })}
    />
  </div>
)

export default App
