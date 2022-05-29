import { useState } from 'react'
import { Table, Pagination } from 'rsuite';
import { LinkButton } from "components/Button"

const fakeData = [
  {
    "id": 1,
    "account": "WadeZhu",
    "email": "wade790720@gmail.com",
  },
]

const MemberTable = () => {
  const { Column, HeaderCell, Cell } = Table

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
                  <LinkButton onClick={handleAction}> 編輯 </LinkButton> | <LinkButton onClick={handleAction}> 刪除 </LinkButton>
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