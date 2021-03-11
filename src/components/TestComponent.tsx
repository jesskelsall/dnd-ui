import React from 'react'

export interface TestComponentProps {
  foo: string,
  bar?: boolean,
}

export const TestComponent = ({ bar = false, foo }: TestComponentProps): JSX.Element => {
  const text = `${foo}? ${bar}`

  return (
    <div>
      <p>{text}</p>
    </div>
  )
}
