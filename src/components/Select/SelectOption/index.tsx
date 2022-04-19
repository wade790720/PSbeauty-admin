import styled from "../Select.module.scss"
import { SelectOptionType } from "../index"

export type SelectOptionProps = {
  /**
   * If true, the input will be disabled.
   */
  disabled?: boolean
  /**
   * The select option value.
   */
  value: string
  /**
   * The select option key.
   */
  eventKey: ReactProps.EventKey
  /**
   * Callback when click.
   */
  onClick?: (e: React.MouseEvent<Element, MouseEvent>, option: SelectOptionType) => void
} & ReactProps.Component

const SelectOption = ({ ...props }: SelectOptionProps) => {
  return (
    <div
      className={styled.item}
      onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
        props.onClick && props.onClick(e, { value: props.value, eventKey: props.eventKey })
      }>
      {props.children}
    </div>
  )
}
export default SelectOption
