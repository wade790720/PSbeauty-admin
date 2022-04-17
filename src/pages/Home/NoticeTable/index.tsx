import cx from "classnames"
import styled from "./NoticeTable.module.scss"
import { ReactComponent as Edit } from "./Edit.svg"
import { ReactComponent as Remove } from "./Remove.svg"

const NoticeTable = () => {
  return (
    <div className={styled.wrapper}>
      <table>
        <thead>
          <tr>
            <th>標題</th>
            <th>內容</th>
            <th>創建時間</th>
            <th className="text-end">動作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="text-gray-800 fw-bold mt-1 d-block fs-7">歡迎使用</span>
            </td>
            <td>
              <span className={cx("text-gray-800 fw-bold d-block fs-6", styled.ellipsis)}>使用說明說明書，或稱作使用手冊，是產品製造者介紹產品的內容、指導用戶使用它的產品而編寫的，又或是向讀者、用戶、觀眾介紹某種讀物、或戲曲、電影的事故情節，演員陣容等的文字材料。</span>
            </td>
            <td>
              <span className="text-gray-800 fw-bold d-block fs-6">2022-04-18</span>
            </td>
            <td className="text-end">
              <div className="btn btn-icon btn-bg-light btn-active-primary btn-sm">
                <Remove />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default NoticeTable