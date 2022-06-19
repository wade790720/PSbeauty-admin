import cx from "classnames"
import styled from "./List.module.scss"
import Item from "./Item"

const List = ({ className, children, ...props }: ReactProps.Component) => {
  return (
    <div className={cx(styled.wrapper, className)} {...props}>
      {children}
    </div>
  )
}

List.Item = Item
export default List
