import React from 'react'

export interface NumberInputProps {
  disabled?: boolean,
  onChange: (value: number) => void,
  placeholder?: string,
  skipTab?: boolean,
  value: number | string,
}

export const NumberInput = ({
  disabled = false,
  onChange,
  placeholder,
  skipTab = false,
  value,
}: NumberInputProps): JSX.Element => (
  <input
    className="form-control"
    disabled={disabled}
    onChange={(event) => onChange(parseFloat(event.target.value) || 0)}
    placeholder={placeholder}
    tabIndex={skipTab ? -1 : undefined}
    type="number"
    value={value}
  />
)
