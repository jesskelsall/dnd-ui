import React from 'react'

export interface NumberInputProps {
  disabled: boolean,
  onChange: (value: number) => void,
  value: number | string,
}

export const NumberInput = ({
  disabled,
  onChange,
  value,
}: NumberInputProps): JSX.Element => (
  <input
    className="form-control"
    disabled={disabled}
    onChange={(event) => onChange(parseInt(event.target.value, 10) || 0)}
    type="number"
    value={value}
  />
)
