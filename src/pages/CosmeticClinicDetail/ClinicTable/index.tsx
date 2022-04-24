import { ReactComponent as ArrowRight } from "./ArrowRight.svg"
import { useGo } from "components/Router"

const ClinicTable = () => {
  const go = useGo()

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="p-0" style={{ width: "50px" }}></th>
          <th className="p-0" style={{ minWidth: "150px" }}></th>
          <th className="p-0" style={{ minWidth: "120px" }}></th>
          <th className="p-0" style={{ minWidth: "70px" }}></th>
          <th className="p-0" style={{ minWidth: "70px" }}></th>
          <th className="p-0" style={{ minWidth: "50px" }}></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-0 py-3">
            <div className="symbol symbol-55px mt-1 me-5">
              <div className="symbol-label bg-light-primary">星</div>
            </div>
          </td>
          <td className="px-0">
            <a href="#a" className="text-gray-800 fw-bold d-block fs-6">星采醫學美容診所</a>
            <span className="text-muted fw-bold mt-1 d-block fs-7">100台北市中正區羅斯福路一段32號2樓</span>
          </td>
          <td></td>
          <td className="text-end">
            <span className="text-gray-800 fw-bold d-block fs-6">100</span>
            <span className="text-muted fw-bold mt-1 d-block fs-7">症例數</span>
          </td>
          <td className="text-end">
            <span className="text-gray-800 fw-bold d-block fs-6">100</span>
            <span className="text-muted fw-bold mt-1 d-block fs-7">回覆數</span>
          </td>

          <td className="text-end">
            <div className="btn btn-icon btn-bg-light btn-active-primary btn-sm" onClick={() => go.toCosmeticClinicDetail({ id: "star-clinic" })}>
              <span className="svg-icon">
                <ArrowRight />
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default ClinicTable