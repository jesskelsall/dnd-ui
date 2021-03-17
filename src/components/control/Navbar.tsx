import React from 'react'
import classNames from 'classnames'
import { Page } from '../../types/Page'
import { PAGES } from '../../consts/pages'

export interface NavbarProps {
  activePage: Page,
  onClick: (navbarLink: Page) => void,
}

export const Navbar = ({
  activePage,
  onClick,
}: NavbarProps): JSX.Element => (
  <div className="navbar d-grid gap-2 d-md-flex justify-content-md-start">
    <span className="navbar-brand mb-0 h1">dnd-ui</span>
    {PAGES.map((page) => {
      const isActive = page === activePage

      return (
        <button
          className={classNames('btn', {
            'btn-outline-primary': !isActive,
            'btn-primary': isActive,
          })}
          onClick={() => onClick(page)}
          type="button"
        >
          {page}
        </button>
      )
    })}
  </div>
)
