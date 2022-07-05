import { useMemo, useState } from "react"
import { Table, Pagination } from "rsuite"
import Card from "components/Card"
import { LinkButton } from "components/Button"
import { GetSettingQuery, useDeleteMemberMutation } from "../SystemSettings.graphql.generated"

type MemberCardProps = {
  data: GetSettingQuery["users"]
}

const MemberCard = ({ data }: MemberCardProps) => {
  const { Column, HeaderCell, Cell } = Table
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const members = useMemo(() => {
    if (!data?.edges) return []

    return data?.edges?.map((member, index) => ({
      index: index + 1,
      id: member.node?.id || "",
      name: member.node?.name || "",
      email: member.node?.email || "",
    }))
  }, [data])

  const [deleteMemberMutation] = useDeleteMemberMutation({ refetchQueries: ["GetSetting"] })

  const handleDelete = (id: string) => {
    deleteMemberMutation({
      variables: {
        id,
      },
    })
  }

  const handleChangeLimit = (dataKey: number) => {
    setPage(1)
    setLimit(dataKey)
  }

  return (
    <Card>
      <Card.Header title="會員列表" />
      <Card.Body>
        <Table height={400} data={members}>
          <Column width={70} align="center" fixed>
            <HeaderCell>序號</HeaderCell>
            <Cell dataKey="index" />
          </Column>

          <Column width={200} fixed>
            <HeaderCell>名稱</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={200} flexGrow={1}>
            <HeaderCell>信箱</HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>動作</HeaderCell>
            <Cell>
              {rowData => {
                return (
                  <span>
                    <LinkButton onClick={() => handleDelete(rowData.id)}> 刪除 </LinkButton>
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
          total={members.length}
          limitOptions={[10, 20]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </Card.Body>
    </Card>
  )
}

export default MemberCard
