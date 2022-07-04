import styled from "./List.module.scss"
import cx from "classnames"

export type ItemProps = {
  onClick?: React.MouseEventHandler<HTMLElement>
} & ReactProps.Component

const Item = ({ className, children, ...props }: ItemProps) => {
  return (
    <div className={cx(styled.item, className)} onClick={props.onClick}>
      {children}
    </div>
  )
}

export default Item
