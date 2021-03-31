import { isEqual } from 'lodash/fp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, setRealTime, setScreen } from '../../reducers'
import {
  generateScreen, selectActiveScreen, selectPage, selectRealTime, selectScreen,
} from '../../selectors'
import { Navbar } from '../control/Navbar'
import {
  CharactersPage, DataPage, EditCharacterPage, ScreensPage,
} from '../control/pages'

export const ControlArea = (): JSX.Element => {
  const dispatch = useDispatch()

  // Navigation
  const activePage = useSelector(selectPage)
  const activeScreen = useSelector(selectActiveScreen)

  // Whether the screen is up to date or not
  const currentScreen = useSelector(selectScreen)
  const generatedScreen = useSelector(generateScreen)
  const realTime = useSelector(selectRealTime)
  const changesToApply = !isEqual(currentScreen, generatedScreen)

  const applyChanges = () => dispatch(setScreen(generatedScreen))

  const changeRealTime = (newRealTime: boolean) => {
    dispatch(setRealTime(newRealTime))
    if (newRealTime) applyChanges()
  }

  if (realTime && changesToApply) applyChanges()

  return (
    <div className="area control-area">
      <Navbar
        activePage={activePage}
        activeScreen={activeScreen}
        changesToApply={changesToApply}
        onApplyChanges={applyChanges}
        onChangeRealTime={changeRealTime}
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
