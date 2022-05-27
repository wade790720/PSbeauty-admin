import styled from "./NoticeTable.module.scss"
import { Table } from 'rsuite';
import { LinkButton } from "components/Button"


const fakeData = [
  {
    "id": 1,
    "title": "New Amieshire",
    "content": "Ratke Port",
    "createTime": "2022-04-18",
  },
]


const NoticeTable = () => {
  const { Column, HeaderCell, Cell } = Table

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
                  <LinkButton onClick={handleAction}> Edit </LinkButton> | <LinkButton onClick={handleAction}> Remove </LinkButton>
                </span>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </div>
  )
}

export default NoticeTable