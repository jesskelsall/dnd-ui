import React from 'react'
import { Choice } from '../../types/Choice'

export const Dropdown = <V extends string = string>({
  onChange,
  options,
  value,
}: {
  onChange: (option: V) => void,
  options: Choice<V>[],
  value: V,
}): JSX.Element => (
  <select className="form-select" onChange={(event) => onChange(event.target.value as V)} value={value}>
    {options.map((choice) => (
      <option key={choice.value} value={choice.value}>{choice.label}</option>
    ))}
  </select>
  )
