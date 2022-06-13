import React, { useState } from "react"
import IconButton from "components/Button/IconButton"
import styled from "./ButtonGroup.module.scss"

export type ButtonGroupProps = {
  /**
   * Default values for the ButtonGroup.
   */
  defaultActiveKey?: ReactProps.EventKey
  /**
   * Called when selected value has changed.
   */
  onSelect?: (
    e: React.MouseEvent<Element, MouseEvent>,
    { eventKey }: { eventKey?: ReactProps.EventKey },
  ) => void
} & ReactProps.Component

const ButtonGroup = (props: ButtonGroupProps) => {
  const [eventKey, setEventKay] = useState(props.defaultActiveKey)

  const handleClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    { eventKey }: { eventKey?: ReactProps.EventKey },
  ) => {
    if (!eventKey) return

    setEventKay(eventKey)
    props.onSelect && props.onSelect(e, { eventKey })
  }

  return (
    <div className={styled.outer}>
      {React.Children.map(props.children, child => {
        if (!React.isValidElement(child)) return
        if (child.type === IconButton) {
          return React.cloneElement(child, {
            ...child.props,
            variant: "secondary",
            selected: child.props.eventKey === eventKey,
            onClick: handleClick,
          })
        }
        return null
      })}
    </div>
  )
}
export default ButtonGroup
