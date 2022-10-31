import cx from "classnames"
import styled from "./List.module.scss"
import Item from "./Item"
import React, { useState } from "react"

type ListProps = {
  default?: string
} & ReactProps.Component

const List = ({ className, children, ...props }: ListProps) => {
  const [active, setActive] = useState(props.default)

  return (
    <div className={cx(styled.wrapper, className)} {...props}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return
        return React.cloneElement(child, {
          ...child.props,
          active: child.props.value === active,
          onClick: (e: { target: HTMLInputElement }) => {
            setActive(e.target.innerText)
            child.props.onClick && child.props.onClick()
          },
        })
      })}
    </div>
  )
}

List.Item = Item
export default List
