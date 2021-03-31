import classNames from 'classnames'
import { startCase } from 'lodash/fp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../../../reducers'
import { selectPage } from '../../../selectors'
import { ScreenType } from '../../../types/Screen'

const SECONDARY_PAGES: ScreenType[] = [
  'cardsGrid',
  'heroCard',
  'initiativeTower',
]

export const ScreensPage = (): JSX.Element => {
  const activePage = useSelector(selectPage)
  const dispatch = useDispatch()

  const onNavigate = (secondary: ScreenType) => () => dispatch(setPage({
    primary: 'screens',
    secondary,
  }))

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
                onClick={onNavigate(secondaryPage)}
                type="button"
              >
                {startCase(secondaryPage)}
              </button>
            )
          })}
        </div>
      </div>

      {/* Secondary Pages */}

    </div>
  )
}
