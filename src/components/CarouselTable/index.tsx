import { useState } from 'react'
import styled from "./CarouselTable.module.scss"
import { Table, Pagination } from 'rsuite';
import { LinkButton } from "components/Button"


const fakeData = [
  {
    "id": 1,
    "status": "open",
    "title": "New Amieshire",
    "content": "Ratke Port",
    "createTime": "2022-04-18",
  },
]


const CarouselTable = () => {
  const { Column, HeaderCell, Cell } = Table

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

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

        <Column width={70} align="center" fixed>
          <HeaderCell>狀態</HeaderCell>
          <Cell dataKey="status" />
        </Column>

        <Column width={200} fixed>
          <HeaderCell>標題</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column width={200} flexGrow={1}>
          <HeaderCell>內容</HeaderCell>
          <Cell dataKey="content" />
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
                  <LinkButton onClick={handleAction}> 輪播圖 </LinkButton> | <LinkButton onClick={handleAction}> 刪除 </LinkButton>
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
    </div>
  )
}

export default CarouselTable