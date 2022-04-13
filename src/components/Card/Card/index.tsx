import styled from "./Card.module.scss"
import cx from "classnames"

type CardProps = {
  full?: boolean
  variant?: "primary" | "secondary"
} & ReactProps.Component

const Card = ({ variant = "primary", ...props }: CardProps) => {
  return (
    <div
      className={cx(styled.wrapper, { [styled.full]: props.full }, styled[variant])}
      style={props.style}>
      {props.children}
    </div>
  )
}

export default Card
