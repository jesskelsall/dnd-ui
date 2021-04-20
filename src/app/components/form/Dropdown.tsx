import React from 'react'
import { Choice, ChoiceValue } from '../../types/Choice'

export const Dropdown = <V extends ChoiceValue = string>({
  onChange,
  options,
  value,
}: {
  onChange: (option: V) => void,
  options: Choice<V>[],
  value: V,
}): JSX.Element => {
  const valuesAreNumbers = typeof options[0].value === 'number'

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const castValue = valuesAreNumbers ? parseFloat(event.target.value) : event.target.value
    onChange(castValue as V)
  }

  return (
    <select
      className="form-select"
      onChange={onChangeSelect}
      value={value}
    >
      {options.map((choice) => (
        <option key={choice.value} value={choice.value}>{choice.label}</option>
      ))}
    </select>
  )
}
