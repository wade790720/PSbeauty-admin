import React from "react"
import Icon from "components/Icon/index"
import styled from "./Breadcrumbs.module.scss"

export type BreadcrumbsProps = ReactProps.WithChildren

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const childrenLength = React.Children.count(props.children)
  return (
    <ol className={styled.items}>
      {React.Children.map(props.children, (child, i) => {
        if (!React.isValidElement(child)) return
        const isNode = i < childrenLength - 1
        return (
          <>
            {child}
            {isNode && <Icon name="arrow-right" className={styled.icon} />}
          </>
        )
      })}
    </ol>
  )
}

export default Breadcrumbs
