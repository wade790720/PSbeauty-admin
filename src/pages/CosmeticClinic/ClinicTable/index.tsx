import { useState } from "react"
import { useGo } from "components/Router"
import { Table, Pagination } from "rsuite"
import { LinkButton } from "components/Button"

const fakeData = [
  {
    id: 1,
    name: "星采醫學美容診所",
    address: "100台北市中正區羅斯福路一段32號2樓",
    caseCount: 100,
    replyCount: 100,
  },
]

const ClinicTable = () => {
  const { Column, HeaderCell, Cell } = Table
  const go = useGo()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

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
                alert(`id:${rowData.id}`)
              }
              return (
                <span>
                  <LinkButton onClick={() => go.toCosmeticClinicDetail({ id: "star-clinic" })}>
                    {" "}
                    編輯{" "}
                  </LinkButton>{" "}
                  | <LinkButton onClick={handleAction}> 刪除 </LinkButton>
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
    </>
  )
}

export default ClinicTable
