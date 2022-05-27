import cx from "classnames"
import styled from "./DropdownMenu.module.scss"
import React, { forwardRef, useRef, useEffect, useState, useMemo } from "react"
import DropdownItem from "../DropdownItem"
import DropdownBody from "../DropdownBody"
import DropdownHeader from "../DropdownHeader"
import DropdownFooter from "../DropdownFooter"
import { FixedSizeList } from "react-window"

export type DropdownMenuProps = {
  /**
   * Height of the dropdown item.
   */
  rowHeight?: number
} & ReactProps.Component

const LIST_MAX_HEIGHT = 224
const ITEM_PADDING = 32
const MENU_MIN_WIDTH = 141

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(function Dropdown(
  props: DropdownMenuProps,
  ref,
) {
  const listWrapperRef = useRef<HTMLInputElement>(null)
  const [maxWidth, setMaxWidth] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)

  const menu = useMemo(() => {
    const list: React.ReactElement[] = []
    let headerElement = null
    let bodyElement = null
    let footerElement = null
    React.Children.forEach(props.children, child => {
      if (!React.isValidElement(child)) return
      if (child.type === DropdownHeader) {
        headerElement = child
      }
      if (child.type === DropdownBody) {
        bodyElement = child
      }
      if (child.type === DropdownItem) {
        list.push(child)
      }
      if (child.type === DropdownFooter) {
        footerElement = child
      }
    })
    return {
      header: headerElement,
      body: bodyElement,
      list,
      footer: footerElement,
    }
  }, [props.children])

  useEffect(() => {
    const item = listWrapperRef.current?.querySelectorAll("[class*=DropdownItem]")
    let max = 0

    item?.forEach(el => {
      const width = el.children[0]?.clientWidth
      if (width && width > max) max = width
    })
    setMaxWidth(max)
  }, [scrollOffset])

  return (
    <div className={cx(styled.wrapper, props.className)} style={props.style} ref={ref}>
      {menu.header}
      {menu.body}
      {menu.list.length > 0 && (
        <div className={styled.list} ref={listWrapperRef}>
          {props.rowHeight ? (
            <FixedSizeList
              className={styled.List}
              height={
                props.rowHeight * menu.list.length > LIST_MAX_HEIGHT
                  ? LIST_MAX_HEIGHT
                  : props.rowHeight * menu.list.length
              }
              itemCount={menu.list.length}
              itemSize={props.rowHeight}
              width={`${
                maxWidth - ITEM_PADDING > MENU_MIN_WIDTH
                  ? `calc(${maxWidth}px + ${ITEM_PADDING}px)`
                  : "100%"
              }`}
              onScroll={props => {
                if (props.scrollOffset > scrollOffset) {
                  setScrollOffset(props.scrollOffset)
                }
              }}>
              {({ index, style }) => (
                <div style={style}>
                  {menu.list.map((el, elIndex) => (elIndex === index ? el : null))}
                </div>
              )}
            </FixedSizeList>
          ) : (
            menu.list
          )}
        </div>
      )}
      {menu.footer}
    </div>
  )
})

export default DropdownMenu
