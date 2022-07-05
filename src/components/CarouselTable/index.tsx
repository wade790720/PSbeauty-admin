import { useState } from "react"
import Modal from "components/Modal"
import Form from "components/Form"
import Button, { LinkButton } from "components/Button"
import { Table, Pagination, Toggle } from "rsuite"
import { ReactComponent as DefaultPhoto } from "./DefaultPhoto.svg"

const fakeData = [
  {
    id: 1,
    status: "open",
    title: "測試輪播",
    url: "/home",
    createTime: "2022-04-18",
  },
]

const CarouselTable = () => {
  const { Column, HeaderCell, Cell } = Table

  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)

  const handleChangeLimit = (dataKey: number) => {
    setPage(1)
    setLimit(dataKey)
  }

  return (
    <>
      <Table
        height={400}
        data={fakeData}
        onRowClick={data => {
          console.log(data)
        }}>
        <Column width={70} align="center" fixed>
          <HeaderCell>序號</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={70} align="center" fixed>
          <HeaderCell>狀態</HeaderCell>
          <Cell dataKey="status" />
        </Column>

        <Column width={200} fixed>
          <HeaderCell>標題</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column width={200} flexGrow={1}>
          <HeaderCell>超連結</HeaderCell>
          <Cell dataKey="url" />
        </Column>

        <Column width={200}>
          <HeaderCell>創建時間</HeaderCell>
          <Cell dataKey="createTime" />
        </Column>
        <Column width={120} fixed="right">
          <HeaderCell>動作</HeaderCell>
          <Cell>
            {rowData => {
              function handleAction() {
                alert(`id:${rowData.id}`)
              }
              return (
                <span>
                  <LinkButton onClick={() => setOpen(true)}> 編輯 </LinkButton> |{" "}
                  <LinkButton onClick={handleAction}> 刪除 </LinkButton>
                </span>
              )
            }}
          </Cell>
        </Column>
      </Table>
      <Pagination
        className="p-5"
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        maxButtons={5}
        size="xs"
        layout={["-", "limit", "|", "pager", "skip"]}
        total={fakeData.length}
        limitOptions={[10, 20]}
        limit={limit}
        activePage={page}
        onChangePage={setPage}
        onChangeLimit={handleChangeLimit}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <Modal.Title>編輯</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label>預覽圖</Form.Label>
              <DefaultPhoto
                style={{ width: "350px", height: "135px", border: "1px solid #e4e6ef" }}
              />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>標題</Form.Label>
              <Form.Input type="text" value="測試輪播" />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>超連結</Form.Label>
              <Form.Input type="text" value="/url" />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>狀態</Form.Label>
              <Toggle defaultChecked />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button
            onClick={() => {
              console.log("onConfirm")
              setOpen(false)
            }}>
            儲存
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CarouselTable
