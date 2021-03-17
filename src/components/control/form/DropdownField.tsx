import React from 'react'
import { Choice } from '../../../types/Choice'

export interface DropdownFieldProps {
  onChange: (option: string) => void,
  options: Choice[],
  value: string,
}

export const DropdownField = ({
  onChange,
  options,
  value,
}: DropdownFieldProps): JSX.Element => (
  <select className="form-select" onChange={(event) => onChange(event.target.value)} value={value}>
    {options.map((choice) => (
      <option key={choice.value} value={choice.value}>{choice.name}</option>
    ))}
  </select>
)
