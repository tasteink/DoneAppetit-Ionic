import * as React from "react"

import "./Text.css"

export interface IProps {
  className: string
}

export function Text(props: IProps) {
  return (
    <div data-testid='Text' className='Text'>
      {/* stuff goes here */}
    </div>
  )
}

Text.defaultProps = {
  className: ""
}
