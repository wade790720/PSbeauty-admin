import cx from "classnames"
import styled from "./FormRadio.module.scss"
import React from "react"

export type FormRadioProps = {
  /**
   * If true, the checkbox will be inline style.
   */
  inline?: boolean
} & ReactProps.WithClassName &
  ReactProps.WithChildren &
  Omit<JSX.IntrinsicElements["input"], "type">

const FormRadio = React.forwardRef(function FormRadio(
  { children, inline, ...props }: FormRadioProps,
  ref: React.Ref<HTMLInputElement> = null,
) {
  return (
    <div
      className={cx(
        "component-radio",
        styled.wrapper,
        { [styled.inline]: inline },
        props.className,
      )}>
      <label className={styled.label}>
        <input ref={ref} type="radio" {...props} />
        <span className={styled.content}>{children}</span>
      </label>
    </div>
  )
})

export default FormRadio
