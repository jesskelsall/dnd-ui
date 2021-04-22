import { noop, startCase } from 'lodash/fp'
import React, { useState } from 'react'
import { LINE_TRANSFORMERS } from '../../../consts'
import { Choice, Line } from '../../../types'
import { Dropdown } from '../../form'

const lines: Choice<Line>[] = Object.keys(LINE_TRANSFORMERS).map((line) => ({
  label: startCase(line),
  value: line as Line,
}))

export const CardsGridPage = (): JSX.Element => {
  const [primary, setPrimary] = useState<Line>('realName')
  const [secondary, setSecondary] = useState<Line>('raceAndClasses')
  const [tertiary, setTertiary] = useState<Line>('pronouns')

  const renderLineDropdown = (path: string, value: Line) => (
    <Dropdown<Line>
      onChange={noop}
      options={lines}
      value={value}
    />
  )

  return (
    <div className="page page-scroll cards-grid-page">
      <div className="section">
        <h1>Details</h1>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Primary</label>
          <div className="col">
            {renderLineDropdown('lines.primary', primary)}
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Secondary</label>
          <div className="col">
            {renderLineDropdown('lines.secondary', secondary)}
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Tertiary</label>
          <div className="col">
            {renderLineDropdown('lines.tertiary', tertiary)}
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Avatar</label>
          <div className="col" />
        </div>
      </div>
    </div>
  )
}
