import { noop } from 'lodash/fp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, setRealTime } from '../../reducers'
import {
  selectChangesToApply,
  selectControlData, selectPage, selectRealTime, selectScreen,
} from '../../selectors'
import { Navbar } from '../control/Navbar'
import {
  CharactersPage, DataPage, EditCharacterPage, ScreensPage,
} from '../control/pages'

export const ControlArea = (): JSX.Element => {
  const dispatch = useDispatch()

  // Navigation
  const data = useSelector(selectControlData)
  const activePage = useSelector(selectPage)
  const activeScreen = selectScreen(data)

  // Real time
  const realTime = useSelector(selectRealTime)
  const changesToApply = useSelector(selectChangesToApply)

  return (
    <div className="area control-area">
      <Navbar
        activePage={activePage}
        activeScreen={activeScreen}
        changesToApply={changesToApply}
        onApplyChanges={noop}
        onChangeRealTime={() => dispatch(setRealTime(!realTime))}
        onNavigate={(page) => dispatch(setPage(page))}
        realTime={realTime}
      />
      {activePage.primary === 'characters' && (
        activePage.secondary ? <EditCharacterPage /> : <CharactersPage />
      )}
      {activePage.primary === 'screens' && <ScreensPage />}
      {activePage.primary === 'data' && <DataPage />}
    </div>
  )
}
