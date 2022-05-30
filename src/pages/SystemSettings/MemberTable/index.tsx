import { useState } from 'react'
import { Table, Pagination } from 'rsuite';
import { LinkButton } from "components/Button"
import Modal from "components/Modal"
import Form from "components/Form"

const fakeData = [
  {
    "id": 1,
    "account": "WadeZhu",
    "email": "wade790720@gmail.com",
  },
]

const MemberTable = () => {
  const { Column, HeaderCell, Cell } = Table
  const [open, setOpen] = useState(false);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

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

        <Column width={200} fixed>
          <HeaderCell>帳號</HeaderCell>
          <Cell dataKey="account" />
        </Column>

        <Column width={200} flexGrow={1}>
          <HeaderCell>信箱</HeaderCell>
          <Cell dataKey="email" />
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
                  <LinkButton onClick={() => setOpen(true)}> 編輯 </LinkButton> | <LinkButton onClick={handleAction}> 刪除 </LinkButton>
                  <Modal
                    title="編輯會員"
                    open={open}
                    confirmText="儲存"
                    cancelText="取消"
                    onConfirm={() => { console.log("onConfirm") }}
                    onClose={() => setOpen(false)}
                  >
                    <Modal.Body>
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
                    </Modal.Body>
                  </Modal>
                </span>
              );
            }}
          </Cell>
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={fakeData.length}
          limitOptions={[10, 20]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </>
  )
}

export default MemberTable