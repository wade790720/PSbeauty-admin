import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import { Table } from "rsuite"
import {
  ActivityFragment,
  useAddActivityMutation,
  useDeleteActivityMutation,
} from "../ClinicDetail.graphql.generated"

const ActivityCard = () => {
  const { Column, HeaderCell, Cell } = Table

  const handleDelete = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask) console.log(id)
  }

  return (
    <>
      <Card>
        <Card.Header title="活動">
          <Button variant="secondary">新增</Button>
        </Card.Header>
      </Card>
      <Card.Body>
        <Table height={400}>
          <Column width={70} align="center" fixed>
            <HeaderCell>序號</HeaderCell>
            <Cell dataKey="index" />
          </Column>

          <Column width={70} align="center" fixed>
            <HeaderCell>活動主題</HeaderCell>
            <Cell dataKey="status" />
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>動作</HeaderCell>
            <Cell>
              {rowData => {
                return (
                  <span>
                    <LinkButton
                      onClick={() => {
                        console.log("click")
                      }}>
                      {" "}
                      檢視{" "}
                    </LinkButton>{" "}
                    | <LinkButton onClick={() => handleDelete(rowData.id)}> 刪除 </LinkButton>
                  </span>
                )
              }}
            </Cell>
          </Column>
        </Table>
      </Card.Body>
    </>
  )
}

export default ActivityCard
