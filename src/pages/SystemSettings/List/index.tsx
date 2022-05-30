import styled from './List.module.scss'
import Item from './Item'


const List = ({ className, children, ...props }: ReactProps.Component) => {
  return (
    <div className={styled.wrapper}>
      {children}
    </div>
  )
}

List.Item = Item
export default List