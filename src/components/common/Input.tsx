import * as React from "react"
import classcat from "classcat"

import "./Input.css"

export interface IProps {
  value: string
  placeholder?: string
  className?: string
  inputId?: string
  inputClassName?: string
  isDark: boolean
  onChange: any
  // onChange: (event: React.FormEvent<HTMLInputElement>) => void
}

function sortProps(props: IProps) {
  const { value, placeholder, onChange, inputId, inputClassName, ...otherProps } = props

  const onChangeHandler = (event) => {
    onChange(event.target.value, event)
  }

  const inputProps = {
    value,
    placeholder,
    onChange: onChangeHandler,
    id: inputId,
    className: inputClassName
  }

  return {
    inputProps,
    otherProps
  }
}

export function Input(props: IProps) {
  const { inputProps } = sortProps(props)
  const containerClassName = classcat(["Input", props.isDark && "dark", props.className])

  return (
    <div data-testid='Input' className={containerClassName}>
      <input {...inputProps} />
    </div>
  )
}

Input.defaultProps = {
  className: "",
  placeholder: "",
  inputId: "",
  inputClassName: "",
  isDark: false
}
