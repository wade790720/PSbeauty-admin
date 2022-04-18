import styled from "./CaseTable.module.scss";
import { ReactComponent as ArrowRight } from "./ArrowRight.svg";
import { ReactComponent as Remove } from "./Remove.svg";
import { useGo } from "components/Router";

const CaseTable = () => {
  const go = useGo();

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
              <div
                className="btn btn-icon btn-bg-light btn-active-primary btn-sm me-3"
                title="前往"
                onClick={() => go.toCosmeticClinicDetailCase({ id: "star-clinic", caseId: 1 })}>
                <span className="svg-icon">
                  <ArrowRight />
                </span>
              </div>
              <div className="btn btn-icon btn-bg-light btn-active-primary btn-sm" title="刪除">
                <span className="svg-icon">
                  <Remove />
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span className="text-gray-800 fw-bold mt-1 d-block fs-7">微整形對照圖</span>
            </td>
            <td>
              <span className="text-gray-800 fw-bold d-block fs-6">五官整形 / 三段式精緻鼻雕 / 內視鏡果凍</span>
            </td>
            <td className="text-end">
              <div className="btn btn-icon btn-bg-light btn-active-primary btn-sm me-3" title="前往">
                <span className="svg-icon">
                  <ArrowRight />
                </span>
              </div>
              <div className="btn btn-icon btn-bg-light btn-active-primary btn-sm" title="刪除">
                <span className="svg-icon">
                  <Remove />
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CaseTable;
