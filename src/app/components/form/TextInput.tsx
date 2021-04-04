import React from 'react'

export interface TextInputProps {
  disabled?: boolean,
  onChange: (value: string) => void,
  value: string,
}

export const TextInput = ({
  disabled = false,
  onChange,
  value,
}: TextInputProps): JSX.Element => (
  <input
    className="form-control"
    disabled={disabled}
    onChange={(event) => onChange(event.target.value)}
    type="text"
    value={value}
  />
)
