import classNames from 'classnames'
import { startCase } from 'lodash/fp'
import React from 'react'
import { Page, Screen } from '../../types'

interface NavbarPage {
  active: (secondary: string | null) => boolean,
  page: Page,
}

export interface NavbarProps {
  activePage: Page,
  activeScreen: Screen,
  changesToApply: boolean,
  onApplyChanges: () => void,
  onChangeRealTime: () => void,
  onNavigate: (page: Page) => void,
  realTime: boolean,
}

export const Navbar = ({
  activePage,
  activeScreen,
  changesToApply,
  onApplyChanges,
  onChangeRealTime,
  onNavigate,
  realTime,
}: NavbarProps): JSX.Element => {
  const navbarPages: NavbarPage[] = [
    {
      active: (secondary) => !secondary,
      page: { primary: 'characters', secondary: null },
    },
    {
      active: () => true,
      page: { primary: 'screens', secondary: activeScreen },
    },
    {
      active: () => true,
      page: { primary: 'data', secondary: null },
    },
  ]

  return (
    <div className="navbar navbar-primary">
      <div className="navbar-left d-grid gap-2 d-md-flex justify-content-md-start">
        {/* Title */}
        <span className="navbar-brand mb-0 h1">dnd-ui</span>

        {/* Navigation */}
        {navbarPages.map(({ active, page }) => {
          const isActive = page.primary === activePage.primary && active(activePage.secondary)

          return (
            <button
              className={classNames('btn', {
                'btn-outline-dark': !isActive,
                'btn-dark': isActive,
              })}
              key={page.primary}
              onClick={() => onNavigate(page)}
              type="button"
            >
              {startCase(page.primary)}
            </button>
          )
        })}
      </div>
      <div className="navbar-right d-grid gap-2 d-md-flex justify-content-md-end">
        {/* Real time */}
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            defaultChecked={realTime}
            onChange={() => onChangeRealTime()}
            type="checkbox"
          />
        </div>

        {/* Apply */}
        {realTime ? (
          <button className="btn btn-info" disabled type="button">Real Time</button>
        ) : (
          <button
            className={classNames('btn', {
              'btn-primary': changesToApply,
              'btn-outline-primary': !changesToApply,
            })}
            disabled={!changesToApply}
            onClick={onApplyChanges}
            type="button"
          >
            {changesToApply ? 'Apply Changes' : 'No Changes'}
          </button>
        )}
      </div>
    </div>
  )
}
