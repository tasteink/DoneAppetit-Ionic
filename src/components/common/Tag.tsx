import * as React from "react"

import "./Tag.css"

export interface IProps {
  className: string
}

export const Tag = (props) => {
  return (
    <div className='Tag' data-testid='Tag' onClick={props.onClick}>
      {props.children}
    </div>
  )
}

Tag.defaultProps = {
  className: ""
}
