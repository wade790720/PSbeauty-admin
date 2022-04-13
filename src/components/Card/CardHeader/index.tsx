import React from "react"
import styled from "./CardHeader.module.scss"
import cx from "classnames"

type CardHeaderProps = {
  title: string
} & ReactProps.WithChildren

const CardHeader = (props: CardHeaderProps) => {
  return (
    <header className={cx("card-header-wrapper", styled.wrapper)}>
      <h3 className={styled.title}>{props.title}</h3>
      {props.children}
    </header>
  )
}

export default CardHeader
