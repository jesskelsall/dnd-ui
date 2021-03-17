import React from 'react'

export interface TextInputFieldProps {
  onChange: (value: string) => void,
  value: string,
}

export const TextInputField = ({
  onChange,
  value,
}: TextInputFieldProps): JSX.Element => (
  <input
    className="form-control"
    onChange={(event) => onChange(event.target.value)}
    type="text"
    value={value}
  />
)
