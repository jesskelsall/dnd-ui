import React, { useState } from 'react'
import './App.css'
import { ControlArea } from './components/control/ControlArea'
import { DisplayArea } from './components/display/DisplayArea'
import { dataStub } from './stubs/data'

const App = (): JSX.Element => {
  const [data, setData] = useState(dataStub)

  return (
    <div className="areas">
      <DisplayArea data={data} />
      <ControlArea data={data} onSave={setData} />
    </div>
  // <div style={{
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: '100vh',
  // }}
  // >
  //   <CharacterEditor
  //     character={characters.ahsha}
  //     onSave={(character: Character) => console.info({ character })}
  //   />
  // </div>
  )
}

export default App
