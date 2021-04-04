import classNames from 'classnames'
import { startCase } from 'lodash/fp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setScreen } from '../../../actions'
import { selectPage } from '../../../selectors'
import { Screen } from '../../../types'
import { CardsGridPage } from './CardsGridPage'
import { HeroCardPage } from './HeroCardPage'
import { InitiativeTowerPage } from './InitiativeTowerPage'

const SECONDARY_PAGES: Screen[] = [
  'cardsGrid',
  'heroCard',
  'initiativeTower',
]

export const ScreensPage = (): JSX.Element => {
  const activePage = useSelector(selectPage)
  const dispatch = useDispatch()

  return (
    <div className="page">
      {/* Secondary Navbar */}
      <div className="navbar navbar-secondary">
        <div className="navbar-center d-grid gap-2 d-md-flex">
          {SECONDARY_PAGES.map((secondaryPage) => {
            const isActive = activePage.secondary === secondaryPage

            return (
              <button
                className={classNames('btn', {
                  'btn-primary': isActive,
                  'btn-outline-primary': !isActive,
                })}
                key={secondaryPage}
                onClick={() => dispatch(setScreen(secondaryPage))}
                type="button"
              >
                {startCase(secondaryPage)}
              </button>
            )
          })}
        </div>
      </div>

      {/* Secondary Pages */}
      {activePage.secondary === 'cardsGrid' && <CardsGridPage />}
      {activePage.secondary === 'heroCard' && <HeroCardPage />}
      {activePage.secondary === 'initiativeTower' && <InitiativeTowerPage />}
    </div>
  )
}
