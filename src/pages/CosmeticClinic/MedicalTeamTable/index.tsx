import styled from "./ClinicTable.module.scss"
import { ReactComponent as ArrowRight } from "./ArrowRight.svg"

const MedicalTeamTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th className="p-0 w-50px"></th>
          <th className="p-0 min-w-150px text-start text-gray-800 fw-bold">姓名</th>
          <th className="p-0 min-w-120px"></th>
          <th className="p-0 min-w-70px text-start text-gray-800 fw-bold">專長</th>
          <th className="p-0 min-w-50px text-start text-gray-800 fw-bold">動作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-0 py-3">
            <div className="symbol symbol-55px mt-1 me-5">
              <div className="symbol-label bg-light-primary">楊</div>
            </div>
          </td>
          <td className="px-0">
            <a href="#a" className="text-gray-800 fw-bold d-block fs-6">楊效誠</a>
            <span className="text-muted fw-bold mt-1 d-block fs-7">院長</span>
          </td>
          <td></td>
          <td>
            <span className="text-gray-800 fw-bold d-block fs-6">顏面疤痕 / 雙眼皮手術 / 眼袋 / 眼瞼下垂 / 醫學美容光療雷射 / 微整形注射美容</span>
          </td>
          <td>
            <div className="btn btn-icon btn-bg-light btn-active-primary btn-sm">
              <ArrowRight />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default MedicalTeamTable