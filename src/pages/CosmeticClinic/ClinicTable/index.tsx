import { useState } from 'react'
import { useGo } from "components/Router"
import { Table, Pagination } from 'rsuite';
import { LinkButton } from "components/Button"

const fakeData = [
  {
    "name": "星采醫學美容診所",
    "address": "100台北市中正區羅斯福路一段32號2樓",
    "caseCount": 100,
    "replyCount": 100,
  },
]
interface ImageCellProps {
  dataKey: string;
  [propName: string]: {};
}

const ClinicTable = () => {
  const { Column, HeaderCell, Cell } = Table
  const go = useGo()

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

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
    <>
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
          <HeaderCell>診所名稱</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={300} flexGrow={1}>
          <HeaderCell>診所地址</HeaderCell>
          <Cell dataKey="address" />
        </Column>

        <Column width={100} align="center" fixed>
          <HeaderCell>案例數</HeaderCell>
          <Cell dataKey="caseCount" />
        </Column>

        <Column width={100} align="center" fixed>
          <HeaderCell>回覆數</HeaderCell>
          <Cell dataKey="replyCount" />
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
                  <LinkButton onClick={() => go.toCosmeticClinicDetail({ id: "star-clinic" })}> 編輯 </LinkButton> | <LinkButton onClick={handleAction}> 刪除 </LinkButton>
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

export default ClinicTable