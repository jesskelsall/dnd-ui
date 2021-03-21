import React from 'react'

export interface TextInputFieldProps {
  disabled: boolean,
  onChange: (value: number) => void,
  value: number | string,
}

export const NumberInputField = ({
  disabled,
  onChange,
  value,
}: TextInputFieldProps): JSX.Element => (
  <input
    className="form-control"
    disabled={disabled}
    onChange={(event) => onChange(parseInt(event.target.value, 10) || 0)}
    type="number"
    value={value}
  />
)
