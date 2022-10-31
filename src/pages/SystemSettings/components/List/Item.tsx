import styled from "./List.module.scss"
import cx from "classnames"
import { ReactComponent as CloseIcon } from "./close.svg"

export type ItemProps = {
  value: string | number
  active?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
  onRemove?: React.MouseEventHandler<HTMLElement>
} & ReactProps.Component

const Item = ({ className, children, ...props }: ItemProps) => {
  return (
    <div
      className={cx(styled.item, { [styled.active]: props.active }, className)}
      onClick={props.onClick}>
      {children}
      <span onClick={props.onRemove}>
        <CloseIcon />
      </span>
    </div>
  )
}

export default Item
