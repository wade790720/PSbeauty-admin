import { useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import Modal from "components/Modal"
import Form from "components/Form"
import { Table, Pagination } from "rsuite"

const fakeData = [
  {
    id: 1,
    account: "減齡回春計畫",
  },
  {
    id: 2,
    account: "金藝珍臉部拉提計畫",
  },
  {
    id: 3,
    account: "白冰冰瘦臉計畫",
  },
]

const KeywordCard = () => {
  const [keywordOpen, setKeywordOpen] = useState(false)
  const { Column, HeaderCell, Cell } = Table
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const handleChangeLimit = (dataKey: number) => {
    setPage(1)
    setLimit(dataKey)
  }

  return (
    <>
      <Card>
        <Card.Header title="熱門關鍵字設定">
          <Button variant="secondary" onClick={() => setKeywordOpen(true)}>
            新增
          </Button>
        </Card.Header>
        <Card.Body>
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

            <Column width={200} flexGrow={1}>
              <HeaderCell>關鍵詞</HeaderCell>
              <Cell dataKey="account" />
            </Column>

            <Column width={120} fixed="right">
              <HeaderCell>動作</HeaderCell>
              <Cell>
                {rowData => {
                  function handleAction() {
                    alert(`id:${rowData.id}`)
                  }
                  return (
                    <>
                      <LinkButton onClick={handleAction}> 刪除 </LinkButton>
                    </>
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
        </Card.Body>
      </Card>
      <Modal
        title="編輯會員"
        open={open}
        confirmText="儲存"
        cancelText="取消"
        onConfirm={() => {
          console.log("onConfirm")
        }}
        onClose={() => setOpen(false)}>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label required>帳號</Form.Label>
            <Form.Input type="text" value="WadeZhu" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>信箱</Form.Label>
            <Form.Input type="text" value="wade790720@gmail.com" />
          </Form.Group>
        </Form>
      </Modal>
      <Modal
        title="新增熱門關鍵字"
        open={keywordOpen}
        confirmText="新增"
        cancelText="取消"
        onConfirm={() => {
          console.log("onConfirm")
        }}
        onClose={() => setKeywordOpen(false)}>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label required>關鍵詞</Form.Label>
            <Form.Input type="text" />
          </Form.Group>
        </Form>
      </Modal>
    </>
  )
}

export default KeywordCard
