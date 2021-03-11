import React from 'react'
import logo from './logo.svg'
import './App.css'
import { TestComponent } from './components/TestComponent'
import { CharacterPanel } from './components/CharacterPanel'

interface Char {
  class: string,
  name: string,
  organisation?: string,
  pronouns: string,
  race: string,
  token?: string,
  scale?: number,
}

const chars: Char[] = [
  {
    class: 'Fighter',
    name: 'Ahsha Sallas',
    organisation: 'astorrel-2-private',
    pronouns: 'she/her',
    race: 'Half-orc',
    token: 'ahsha-sallas',
  },
  {
    class: 'Druid',
    name: 'Ephaine Seren',
    organisation: 'astorrel-2-private',
    pronouns: 'she/her',
    race: 'Human',
    token: 'ephaine-seren',
  },
  {
    class: 'Bard',
    name: 'Redwyn Humpledopper',
    organisation: 'astorrel-2-private',
    pronouns: 'she/her',
    race: 'Dwarf',
    token: 'redwyn-humpledopper',
  },
  {
    class: 'Rogue',
    name: 'Whisper on the Breeze',
    organisation: 'astorrel-2-private',
    pronouns: 'they/them',
    race: 'Tabaxi',
    token: 'whisper-on-the-breeze',
  },
  {
    class: 'Warlock',
    name: 'Saoirse ó Dochartaigh',
    pronouns: 'she/her',
    race: 'Aasimar',
    token: 'saoirse-o-dochartaigh',
  },
  {
    class: 'Sorcerer',
    name: 'Thanea Morlay',
    pronouns: 'she/her',
    race: 'Aasimar',
    token: 'thanea-morlay',
  },
  {
    class: 'Fighter',
    name: 'Torbra Tauff',
    pronouns: 'she/her',
    race: 'Earth Genasi',
    token: 'torbra-tauff',
  },
  {
    class: 'Druid',
    name: 'Wizira',
    pronouns: 'she/her',
    race: 'Firbolg',
    token: 'wizira',
  },
]

const App = (): JSX.Element => (
  <div className="App">
    {chars.map((char) => (
      <CharacterPanel
        avatarURL={char.token ? `https://raw.githubusercontent.com/jesskelsall/astarus/main/images/tokens/${char.token}.png` : ''}
        details={char.pronouns}
        name={char.name}
        nameScale={char.scale || 1}
        organisationURL={char.organisation ? `https://raw.githubusercontent.com/jesskelsall/astarus/main/images/ranks/${char.organisation}.png` : ''}
        subheading={`${char.race} ${char.class}`}
      />
    ))}
  </div>
)

export default App
