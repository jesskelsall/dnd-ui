import React from 'react'
import { ControlArea } from './areas/ControlArea'
import { DisplayArea } from './areas/DisplayArea'

export const App = (): JSX.Element => (
  <div className="areas">
    <DisplayArea />
    <ControlArea />
  </div>
)
