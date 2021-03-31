import React from 'react'

export interface TextInputProps {
  onChange: (value: string) => void,
  value: string,
}

export const TextInput = ({
  onChange,
  value,
}: TextInputProps): JSX.Element => (
  <input
    className="form-control"
    onChange={(event) => onChange(event.target.value)}
    type="text"
    value={value}
  />
)
