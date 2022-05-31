import { useState } from 'react'
import { Table } from 'rsuite';
import { LinkButton } from "components/Button"
import Modal from "components/Modal"
import Form from "components/Form"
import { ReactComponent as DefaultPhoto } from "./DefaultPhoto.svg"

const fakeData = [
  {
    "id": 1,
    "name": "楊效誠",
    "title": "院長",
    "skill": "顏面疤痕 / 雙眼皮手術 / 眼袋 / 眼瞼下垂 / 醫學美容光療雷射 / 微整形注射美容",
  },
]

const MedicalTeamTable = () => {
  const { Column, HeaderCell, Cell } = Table
  const [open, setOpen] = useState(false)

  return (
    <>
      <Table
        height={400}
        data={fakeData}
        onRowClick={data => {
          console.log(data);
        }}>

        <Column width={70} align="center" fixed>
          <HeaderCell>序號</HeaderCell>
          <Cell dataKey="id" />
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
                </span>
              );
            }}
          </Cell>
        </Column>
      </Table>
      <Modal
        title="醫師資訊"
        open={open}
        confirmText="確定"
        cancelText="取消"
        onConfirm={() => { console.log("onConfirm") }}
        onClose={() => setOpen(false)}
        style={{ maxWidth: '450px' }}
      >
        <Form>
          <Form.Group layout="vertical">
            <Form.Label>預覽圖 (100 x 100px)</Form.Label>
            <DefaultPhoto style={{ width: '100px', height: '100px', border: '1px solid #e4e6ef' }} />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>姓名</Form.Label>
            <p>楊效誠</p>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>職稱</Form.Label>
            <p>院長</p>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>專長</Form.Label>
            <p>顏面疤痕 / 雙眼皮手術 / 眼袋 / 眼瞼下垂 / 醫學美容光療雷射 / 微整形注射美容</p>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>經歷</Form.Label>
            <p>內容..</p>
          </Form.Group>
        </Form>
      </Modal>
    </>
  )
}

export default MedicalTeamTable