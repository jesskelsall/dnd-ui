import React from 'react'
import logo from './logo.svg'
import './App.css'
import { TestComponent } from './components/TestComponent'
import { CharacterPanel } from './components/CharacterPanel'

const App = (): JSX.Element => (
  <div className="App">
    <CharacterPanel
      avatarURL="https://raw.githubusercontent.com/jesskelsall/astarus/main/images/tokens/ahsha-sallas.png"
      details="she/her"
      name="Ahsha Sallas"
      organisationURL="https://raw.githubusercontent.com/jesskelsall/astarus/main/images/ranks/astorrel-2-private.png"
      subheading="Half-orc Fighter"
    />
    <CharacterPanel
      avatarURL="https://raw.githubusercontent.com/jesskelsall/astarus/main/images/tokens/ephaine-seren.png"
      details="she/her"
      name="Ephaine Seren"
      organisationURL="https://raw.githubusercontent.com/jesskelsall/astarus/main/images/ranks/astorrel-2-private.png"
      subheading="Human Druid"
    />
    <CharacterPanel
      avatarURL="https://raw.githubusercontent.com/jesskelsall/astarus/main/images/tokens/redwyn-humpledopper.png"
      details="she/her"
      name="Redwyn Humpledopper"
      organisationURL="https://raw.githubusercontent.com/jesskelsall/astarus/main/images/ranks/astorrel-2-private.png"
      subheading="Dwarf Bard"
    />
    <CharacterPanel
      avatarURL="https://raw.githubusercontent.com/jesskelsall/astarus/main/images/tokens/whisper-on-the-breeze.png"
      details="they/them"
      name="Whisper on the Breeze"
      organisationURL="https://raw.githubusercontent.com/jesskelsall/astarus/main/images/ranks/astorrel-2-private.png"
      subheading="Tabaxi Rogue"
    />
  </div>
)

export default App
