import { noop } from 'lodash/fp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../../reducers'
import { selectControlData, selectPage, selectScreen } from '../../selectors'
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

  return (
    <div className="area control-area">
      <Navbar
        activePage={activePage}
        activeScreen={activeScreen}
        changesToApply={false}
        onApplyChanges={noop}
        onChangeRealTime={noop}
        onNavigate={(page) => dispatch(setPage(page))}
        realTime
      />
      {activePage.primary === 'characters' && (
        activePage.secondary ? <EditCharacterPage /> : <CharactersPage />
      )}
      {activePage.primary === 'screens' && <ScreensPage />}
      {activePage.primary === 'data' && <DataPage />}
    </div>
  )
}
