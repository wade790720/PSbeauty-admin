import styled from "./MemberTable.module.scss"
import { ReactComponent as Edit } from "./Edit.svg"
import { ReactComponent as Remove } from "./Remove.svg"

const MemberTable = () => {
  return (
    <div className={styled.wrapper}>
      <table>
        <thead>
          <tr>
            <th>名稱</th>
            <th>信箱</th>
            <th className="text-end">動作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="text-gray-800 fw-bold mt-1 d-block fs-7">WadeZhu</span>
            </td>
            <td>
              <span className="text-gray-800 fw-bold d-block fs-6">wade790720@gmail.com</span>
            </td>
            <td className="text-end">
              <div className="btn btn-icon btn-bg-light btn-active-primary btn-sm me-3">
                <span className="svg-icon">
                  <Edit />
                </span>
              </div>
              <div className="btn btn-icon btn-bg-light btn-active-primary btn-sm">
                <span className="svg-icon">
                  <Remove />
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MemberTable