import { isEqual } from 'lodash/fp'
import React, { useState } from 'react'
import './App.css'
import { ControlArea } from './components/control/ControlArea'
import { DisplayArea } from './components/display/DisplayArea'
import { DATA_TEMPLATE } from './consts/dataTemplates'
import { Data } from './types/data'

const App = (): JSX.Element => {
  const [controlData, setControlData] = useState(DATA_TEMPLATE)
  const [displayData, setDisplayData] = useState(DATA_TEMPLATE)
  const [realTime, setRealTime] = useState(true)

  const dataChangesToApply = !realTime && !isEqual(controlData, displayData)

  const applyControlData = () => setDisplayData(controlData)

  const changeControlData = (data: Data) => {
    setControlData(data)
    if (realTime) setDisplayData(data)
  }

  const changeRealTime = (newRealTime: boolean) => {
    setRealTime(newRealTime)
    if (newRealTime) applyControlData()
  }

  return (
    <div className="areas">
      <DisplayArea data={displayData} />
      <ControlArea
        data={controlData}
        dataChangesToApply={dataChangesToApply}
        onApplyData={applyControlData}
        onChangeData={changeControlData}
        onChangeRealTime={changeRealTime}
        realTime={realTime}
      />
    </div>
  )
}

export default App
