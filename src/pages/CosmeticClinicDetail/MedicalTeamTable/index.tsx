import { useState } from 'react'
import { Table } from 'rsuite';
import { LinkButton } from "components/Button"
import Modal from "components/Modal"

const fakeData = [
  {
    "name": "楊效誠",
    "title": "院長",
    "skill": "顏面疤痕 / 雙眼皮手術 / 眼袋 / 眼瞼下垂 / 醫學美容光療雷射 / 微整形注射美容",
  },
]
interface ImageCellProps {
  dataKey: string;
  [propName: string]: {};
}

const MedicalTeamTable = () => {
  const { Column, HeaderCell, Cell } = Table
  const [open, setOpen] = useState(false)

  const ImageCell = ({ dataKey, ...props }: ImageCellProps) => (
    <Cell {...props} style={{ padding: 0 }}>
      {rowData => {
        return (
          <div
            className="inline-flex justify-center items-center"
            style={{
              width: 40,
              height: 40,
              background: '#f5f5f5',
              borderRadius: 20,
              marginTop: 2,
              overflow: 'hidden',
            }}
          >
            {rowData?.name.charAt(0)}
          </div>
        )
      }}
    </Cell>
  );


  return (
    <Table
      height={400}
      data={fakeData}
      onRowClick={data => {
        console.log(data);
      }}>
      <Column width={80} align="center" fixed>
        <HeaderCell> </HeaderCell>
        <ImageCell dataKey="name" />
      </Column>

      <Column width={160} fixed>
        <HeaderCell>姓名</HeaderCell>
        <Cell dataKey="name" />
      </Column>
      
      <Column width={160} fixed>
        <HeaderCell>職稱</HeaderCell>
        <Cell dataKey="title" />
      </Column>

      <Column width={300} flexGrow={1}>
        <HeaderCell>專長</HeaderCell>
        <Cell dataKey="skill" />
      </Column>

      <Column width={120} fixed="right">
        <HeaderCell>動作</HeaderCell>
        <Cell>
          {rowData => {
            function handleAction() {
              alert(`id:${rowData.id}`);
            }
            return (
              <span>
                <LinkButton onClick={() => setOpen(true)}> 檢視 </LinkButton> | <LinkButton onClick={handleAction}> 刪除 </LinkButton>
                <Modal
                  title="醫師資訊"
                  open={open}
                  confirmText="修改"
                  cancelText="取消"
                  onConfirm={() => { console.log("onConfirm") }}
                  onClose={() => setOpen(false)}
                >
                  <Modal.Body>
                    醫師資訊
                  </Modal.Body>
                </Modal>
              </span>
            );
          }}
        </Cell>
      </Column>
    </Table>
  )
}

export default MedicalTeamTable