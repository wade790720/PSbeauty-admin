import { useState } from 'react'
import styled from "./NoticeTable.module.scss"
import { Table, Pagination } from 'rsuite';
import { LinkButton } from "components/Button"

const fakeData = [
  {
    "id": 1,
    "title": "New Amieshire",
    "createTime": "2022-04-18",
  },
]

const NoticeTable = () => {
  const { Column, HeaderCell, Cell } = Table

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  return (
    <div className={styled.wrapper}>
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
          <HeaderCell>標題</HeaderCell>
          <Cell dataKey="title" />
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
                alert(`id:${rowData.id}`);
              }
              return (
                <span>
                  <LinkButton onClick={handleAction}> 預覽圖 </LinkButton> | <LinkButton onClick={handleAction}> 刪除 </LinkButton>
                </span>
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
    </div>
  )
}

export default NoticeTable