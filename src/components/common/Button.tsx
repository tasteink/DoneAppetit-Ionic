import * as React from "react"

import "./Button.css"

export interface IProps {
  className: string
}

export function Button(props: IProps) {
  return (
    <div data-testid='Button' className='Button'>
      {/* stuff goes here */}
    </div>
  )
}

Button.defaultProps = {
  className: ""
}
