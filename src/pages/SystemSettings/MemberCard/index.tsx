import { useMemo, useRef } from "react"
import { Table } from "rsuite"
import Card from "components/Card"
import { LinkButton } from "components/Button"
import { useDeleteMemberMutation } from "../SystemSettings.graphql.generated"
import { useGetMemberQuery } from "../SystemSettings.graphql.generated"

const TABLE_HEIGHT = 400

const MemberCard = () => {
  const { Column, HeaderCell, Cell } = Table
  const afterRef = useRef<string | null>()

  const getSettingQuery = useGetMemberQuery({
    variables: { after: null },
  })

  const members = useMemo(() => {
    if (!getSettingQuery?.data?.users?.edges) return []

    return getSettingQuery?.data?.users?.edges?.map((member, index) => ({
      index: index + 1,
      id: member.node?.id || "",
      name: member.node?.name || "",
      email: member.node?.email || "",
    }))
  }, [getSettingQuery])

  const [deleteMemberMutation] = useDeleteMemberMutation({ refetchQueries: ["GetSetting"] })

  const handleDelete = (id: string) => {
    deleteMemberMutation({
      variables: {
        id,
      },
    })
  }

  const loadMore = () => {
    setTimeout(() => {
      const edges = getSettingQuery?.data?.users?.edges
      const after = edges?.[edges.length - 1]?.cursor || null

      if (afterRef.current === after) return

      if (getSettingQuery?.data?.users?.edges?.length === getSettingQuery?.data?.users?.totalCount)
        return

      if (afterRef) afterRef.current = after

      getSettingQuery.fetchMore({
        variables: {
          after,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if ((prevResult?.users?.edges?.length ?? 0) >= (prevResult?.users?.totalCount ?? 0)) {
            return prevResult
          }

          if (fetchMoreResult?.users?.edges)
            fetchMoreResult.users.edges = [
              ...(edges || []),
              ...(fetchMoreResult?.users?.edges || []),
            ]

          return fetchMoreResult
        },
      })
    }, 200)
  }

  return (
    <Card>
      <Card.Header title="會員列表" />
      <Card.Body>
        <Table
          data={members}
          virtualized
          shouldUpdateScroll={false}
          height={TABLE_HEIGHT}
          onScroll={(_, y) => {
            if (members.length > 0 && members.length * 10 - Math.abs(y) < 1) {
              loadMore()
            }
          }}>
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
      </Card.Body>
    </Card>
  )
}

export default MemberCard
