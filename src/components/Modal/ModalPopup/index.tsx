import Popup from "reactjs-popup"
import { PopupProps } from "reactjs-popup/dist/types"

export type ModalPopupProps = {
  /**
   * Should the modal appear on screen or not
   */
  open?: boolean
  backdrop?: boolean
} & Partial<
  Pick<PopupProps, "open" | "lockScroll" | "closeOnDocumentClick" | "onClose" | "children">
>

const ModalPopup = ({
  open = false,
  closeOnDocumentClick = true,
  lockScroll = false,
  ...props
}: ModalPopupProps) => {
  return (
    <Popup
      modal
      nested
      lockScroll={lockScroll}
      open={open}
      closeOnDocumentClick={closeOnDocumentClick}
      closeOnEscape={false}
      onClose={props.onClose}
      contentStyle={{
        background: "transparent",
        border: "none",
        width: "auto",
      }}
      overlayStyle={{
        backgroundColor: "#091e428a",
      }}>
      {props.children}
    </Popup>
  )
}

export default ModalPopup
