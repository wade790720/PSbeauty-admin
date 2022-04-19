import cx from "classnames"
import React, { useState, useRef } from "react"
import styled from "./Select.module.scss"
import { ReactComponent as ClearIcon } from "./svg/clear.svg"
import { ReactComponent as RemoveIcon } from "./svg/remove.svg"
import Popup from "reactjs-popup"
import { PopupActions } from "reactjs-popup/dist/types"
import { FormControlProps } from "components/Form/types"
import Icon from "components/Icon/index"
import SelectOption from "./SelectOption"

export type SelectProps = {
  /**
   * Specify if the is multiple
   */
  isMulti?: boolean
  /**
   * Default input placeholder.
   */
  placeholder?: string
  /**
   * The default input element value.
   */
  defaultValue?: SelectOptionType | SelectOptionType[]
  /**
   * If true, the input will be disabled.
   */
  disabled?: boolean
  /**
   * Callback when select change. 
   */
  onChange?: (
    e: React.MouseEvent<Element, MouseEvent>,
    {
      selected,
      selectedList,
    }: {
      selected: ReactProps.EventKey | null
      selectedList: SelectOptionType[]
    },
  ) => void
  /**
   * Callback when close the select component. 
   */
  onClose?: () => void
} & ReactProps.Component

export type { SelectOptionProps } from "./SelectOption"

export type SelectOptionType = {
  value: string
  eventKey: ReactProps.EventKey
}

const Select = ({ isMulti = false, ...props }: FormControlProps & SelectProps) => {
  const popupRef = useRef<PopupActions | null>(null)
  const [selected, setSelected] = useState<Array<SelectOptionType>>(
    Array.isArray(props.defaultValue) ? props.defaultValue : [],
  )

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>, option: SelectOptionType) => {
    if (isMulti) {
      const newSelected = selected.concat(option)
      setSelected([...selected, option])

      props.onChange && props.onChange(e, { selected: option.eventKey, selectedList: newSelected })
    } else {
      setSelected([option])
      props.onChange && props.onChange(e, { selected: option.eventKey, selectedList: [option] })
    }
    popupRef.current?.close()
  }

  const handleClear = (e: React.MouseEvent<Element, MouseEvent>) => {
    setSelected([])
    props.onChange && props.onChange(e, { selected: null, selectedList: [] })
  }

  const handleRemoveItem = (e: React.MouseEvent<Element, MouseEvent>, item: SelectOptionType) => {
    const newSelected = selected.filter(option => option.eventKey !== item.eventKey)
    setSelected(newSelected)
    props.onChange &&
      props.onChange(e, {
        selected: null,
        selectedList: newSelected,
      })
  }

  return (
    <div className={cx(styled.wrapper, props.className, styled[props.variant || ""])} style={props.style}>
      <div className={styled.container}>
        <Popup
          ref={popupRef}
          trigger={open => (
            <div
              className={cx(
                styled.control,
                { [styled.active]: open },
                { [styled.disabled]: props.disabled },
              )}>
              {props.placeholder && selected.length === 0 && (
                <div className={styled.placeholder}>{props.placeholder}</div>
              )}

              <div className={styled["vale-container"]}>
                {isMulti ? (
                  <>
                    {selected.map((item, index) => (
                      <div key={index} className={styled["multi-value"]}>
                        <div className={styled.label}>{item.value}</div>
                        {!props.disabled && (
                          <div className={styled.remove} onClick={e => handleRemoveItem(e, item)}>
                            <RemoveIcon />
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {selected.map((item, index) => {
                      return (
                        <div key={index} className={styled["single-value"]}>
                          <div className={styled.label}>{item.value}</div>
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
              <div className={styled.indicator}>
                {isMulti && selected.length > 0 && (
                  <div className={styled["clear-indicator"]} onClick={handleClear}>
                    <span>{!props.disabled && <ClearIcon />}</span>
                  </div>
                )}
                <div className={styled["dropdown-indicator"]}>
                  <Icon name="arrow-down" />
                </div>
              </div>
            </div>
          )}
          onClose={() => props.onClose && props.onClose()}
          position="bottom left"
          on="click"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          arrow={false}
          disabled={props.disabled}
          contentStyle={{
            border: "none",
            paddingTop: "8px",
            boxShadow: "none",
          }}>
          <div className={styled.menu} style={props.style}>
            {React.Children.map(props.children, child => {
              if (!React.isValidElement(child)) return

              if (isMulti && child.type === SelectOption) {
                if (selected.map(option => option.eventKey).indexOf(child.props.eventKey) === -1) {
                  return React.cloneElement(child, { onClick: handleClick })
                }
              } else {
                return React.cloneElement(child, { onClick: handleClick })
              }
            })}
          </div>
        </Popup>
      </div>
    </div>
  )
}

Select.Option = SelectOption

export default Select
