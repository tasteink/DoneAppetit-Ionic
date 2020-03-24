import * as React from "react"
import RCSlider, { Range } from "rc-slider"

import "./Slider.css"

import Tooltip from "rc-tooltip"
// const createSliderWithTooltip = RCSlider.createSliderWithTooltip
// const Range = createSliderWithTooltip(RCSlider.Range)
// const Handle = RCSlider.Handle

// const TipHandle = (props) => {
//   const { value, dragging, index, ...restProps } = props
//   return (
//     <Tooltip
//       prefixCls='rc-slider-tooltip'
//       overlay={value}
//       visible={dragging}
//       placement='top'
//       key={index}
//     >
//       <Handle value={value} {...restProps} />
//     </Tooltip>
//   )
// }

export interface IProps {
  className: string
  defaultValue: number[]
  value: number[]
  minimum: number
  maximum: number
  step: number
  disabled: boolean
  onChange: any
  displayValue: string
}

export function Slider(props: IProps) {
  return (
    <div data-testid='Slider' className='Slider'>
      <p className='Text SliderDisplayValue'>{props.displayValue}</p>
      <Range
        // handle={TipHandle}
        className='SliderRange'
        min={props.minimum}
        max={props.maximum}
        step={props.step}
        disabled={props.disabled}
        onChange={props.onChange}
        allowCross={false}
        value={props.value}
        pushable
      />
    </div>
  )
}

Slider.defaultProps = {
  className: "",
  defaultValue: [],
  value: [],
  minimum: 0,
  maximum: 100,
  step: 10,
  disabled: false,
  displayValue: ""
}
