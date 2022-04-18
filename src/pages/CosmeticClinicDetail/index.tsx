import Button from "components/Button"
import Card from "components/Card"
import { ReactComponent as EllipsisVertical } from "./EllipsisVertical.svg"
import { useGo } from "components/Router"
import { useParams } from 'react-router';

const CosmeticClinicDetail = () => {
  const { id } = useParams();
  const go = useGo()

  return (
    <>
      <Card>
        <Card.Header title="症例">
          <Button variant="secondary">新增症例</Button>
        </Card.Header>
        <Card.Body>
          <table>
            <thead>
              <tr>
                <th className="p-0 w-50px"></th>
                <th className="p-0 min-w-150px"></th>
                <th className="p-0 min-w-120px"></th>
                <th className="p-0 min-w-70px"></th>
                <th className="p-0 min-w-70px"></th>
                <th className="p-0 min-w-50px"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-0 py-3">
                  <div className="symbol symbol-55px mt-1 me-5">
                    <div className="symbol-label bg-light-primary">ㄧ</div>
                  </div>
                </td>
                <td className="px-0">
                  <div
                    className="text-gray-800 fw-bold d-block fs-6"
                    onClick={() => go.toCosmeticClinicDetailCase({ id: "star-clinic", caseId: 1 })}
                  >病例一</div>
                  <span className="text-muted fw-bold mt-1 d-block fs-7">美白針、飛梭雷射</span>
                </td>
                <td></td>
                <td className="text-end">
                  {/* <span className="text-gray-800 fw-bold d-block fs-6">100</span>
                  <span className="text-muted fw-bold mt-1 d-block fs-7">症例數</span> */}
                </td>
                <td className="text-end">
                  {/* <span className="text-gray-800 fw-bold d-block fs-6">100</span>
                  <span className="text-muted fw-bold mt-1 d-block fs-7">回覆數</span> */}
                </td>

                <td className="text-end">
                  <div
                    className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                    onClick={() => go.toCosmeticClinicDetailCase({ id: "star-clinic", caseId: 1 })}>
                    <EllipsisVertical />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </>
  )
}

export default CosmeticClinicDetail
