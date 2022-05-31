import { useState } from 'react'
import { Table, Pagination } from 'rsuite';
import { LinkButton } from "components/Button"
import Modal from "components/Modal"
import Form from "components/Form"

const fakeData = [
  {
    "id": 1,
    "account": "減齡回春計畫",
  }, {
    "id": 2,
    "account": "金藝珍臉部拉提計畫",
  }, {
    "id": 3,
    "account": "白冰冰瘦臉計畫",
  },
]

const KeywordTable = () => {
  const { Column, HeaderCell, Cell } = Table
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  return (
    <>
      <Table
        height={400}
        data={fakeData}
        onRowClick={data => {
          console.log(data);
        }}
      >
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
                alert(`id:${rowData.id}`);
              }
              return (
                <>
                  <LinkButton onClick={handleAction}> 刪除 </LinkButton>
                </>
              );
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
        layout={['-', 'limit', '|', 'pager', 'skip']}
        total={fakeData.length}
        limitOptions={[10, 20]}
        limit={limit}
        activePage={page}
        onChangePage={setPage}
        onChangeLimit={handleChangeLimit}
      />
      <Modal
        title="編輯會員"
        open={open}
        confirmText="儲存"
        cancelText="取消"
        onConfirm={() => { console.log("onConfirm") }}
        onClose={() => setOpen(false)}
      >
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
    </>
  )
}

export default KeywordTable