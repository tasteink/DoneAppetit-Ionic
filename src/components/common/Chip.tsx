import * as React from "react"
import classcat from "classcat"

import "./Chip.css"

export interface IProps {
  className: string
  onClick: any
  children: any
  isActive: boolean
}

export function Chip(props: IProps) {
  const className = classcat(["Chip", props.isActive && "ChipActive"])

  const onClick = (event: any) => {
    console.log("onClick", !props.isActive)
    props.onClick(!props.isActive, event)
  }

  return (
    <div data-testid='Chip' className={className} onClick={onClick}>
      {props.children}
    </div>
  )
}

Chip.defaultProps = {
  className: "",
  isActive: false
}
