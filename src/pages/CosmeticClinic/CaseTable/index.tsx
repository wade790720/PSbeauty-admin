import styled from "./CaseTable.module.scss"
import { ReactComponent as Edit } from "./Edit.svg"
import { ReactComponent as Remove } from "./Remove.svg"

const CaseTable = () => {
  return (
    <div className={styled.wrapper}>
      <table>
        <thead>
          <tr>
            <th>標題</th>
            <th>分類</th>
            <th className="text-end">動作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="text-gray-800 fw-bold mt-1 d-block fs-7">音波拉提對照圖</span>
            </td>
            <td>
              <span className="text-gray-800 fw-bold d-block fs-6">顏面疤痕 / 雙眼皮手術 / 眼袋</span>
            </td>
            <td className="text-end">
              <div className="btn btn-icon btn-bg-light btn-active-primary btn-sm me-3">
                <Edit />
              </div>
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

export default CaseTable