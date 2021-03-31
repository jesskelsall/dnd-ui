import classNames from 'classnames'
import { startCase } from 'lodash/fp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../../app/reducers'
import { selectPage } from '../../app/selectors'
import { Page } from '../../app/types/Page'

const NAVBAR_PAGES: Page[] = [
  { primary: 'characters', secondary: null },
  { primary: 'screens', secondary: 'cardsGrid' },
  { primary: 'data', secondary: null },
]

export interface NavbarProps {
  // activePage: Page,
  dataChangesToApply: boolean,
  onApplyData: () => void,
  onChangeRealTime: (realTime: boolean) => void,
  // onNavigate: (navbarLink: Page) => void,
  realTime: boolean,
}

export const Navbar = ({
  // activePage,
  dataChangesToApply,
  onApplyData,
  onChangeRealTime,
  // onNavigate,
  realTime,
}: NavbarProps): JSX.Element => {
  const activePage = useSelector(selectPage)
  const dispatch = useDispatch()

  const onNavigate = (page: Page) => () => dispatch(setPage(page))

  return (
    <div className="navbar">
      <div className="navbar-left d-grid gap-2 d-md-flex justify-content-md-start">
        {/* Title */}
        <span className="navbar-brand mb-0 h1">dnd-ui</span>

        {/* Navigation */}
        {NAVBAR_PAGES.map((page) => {
          const isActive = page.primary === activePage.primary

          return (
            <button
              className={classNames('btn', {
                'btn-outline-primary': !isActive,
                'btn-primary': isActive,
              })}
              key={page.primary}
              onClick={onNavigate(page)}
              type="button"
            >
              {startCase(page.primary)}
            </button>
          )
        })}
      </div>
      <div className="navbar-right d-grid gap-2 d-md-flex justify-content-md-end">
        {/* Real time */}
        <div className="form-check">
          <input
            className="form-check-input"
            defaultChecked={realTime}
            onChange={() => onChangeRealTime(!realTime)}
            type="checkbox"
          />
          <label className="form-check-label">Real time update</label>
        </div>

        {/* Apply */}
        {realTime ? (
          <button className="btn btn-info" disabled type="button">Real Time</button>
        ) : (
          <button
            className="btn btn-primary"
            disabled={!dataChangesToApply}
            onClick={onApplyData}
            type="button"
          >
            Apply Changes
          </button>
        )}
      </div>
    </div>
  )
}
