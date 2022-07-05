import { useMemo, useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import Modal from "components/Modal"
import Form from "components/Form"
import { Table, Pagination } from "rsuite"
import { useForm } from "react-hook-form"
import {
  GetSettingQuery,
  useAddKeywordMutation,
  useDeleteKeywordMutation,
} from "../SystemSettings.graphql.generated"

type KeywordCardProps = {
  data: GetSettingQuery["popularKeywords"]
}

type Inputs = {
  keyword: string
}

const KeywordCard = ({ data }: KeywordCardProps) => {
  const { register, getValues, formState, handleSubmit } = useForm<Inputs>({ mode: "onTouched" })
  const [keywordOpen, setKeywordOpen] = useState(false)
  const { Column, HeaderCell, Cell } = Table
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const keywords = useMemo(() => {
    if (!data?.keywords) return []

    return data?.keywords?.map((word, index) => ({
      id: index + 1,
      name: word,
    }))
  }, [data])

  const [addKeywordMutation] = useAddKeywordMutation({ refetchQueries: ["GetSetting"] })
  const [deleteKeywordMutation] = useDeleteKeywordMutation({ refetchQueries: ["GetSetting"] })

  const handleAdd = () => {
    addKeywordMutation({
      variables: {
        keyword: getValues().keyword,
      },
    })
  }

  const handleDelete = (keyword: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteKeywordMutation({
        variables: {
          keyword,
        },
      })
  }

  const handleChangeLimit = (dataKey: number) => {
    setPage(1)
    setLimit(dataKey)
  }

  return (
    <>
      <Card>
        <Card.Header title="熱門關鍵字設定">
          <Button variant="secondary" onClick={() => setKeywordOpen(true)}>
            新增
          </Button>
        </Card.Header>
        <Card.Body>
          <Table height={400} data={keywords}>
            <Column width={70} align="center" fixed>
              <HeaderCell>序號</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={200} flexGrow={1}>
              <HeaderCell>關鍵詞</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={120} fixed="right">
              <HeaderCell>動作</HeaderCell>
              <Cell>
                {rowData => {
                  return (
                    <>
                      <LinkButton onClick={() => handleDelete(rowData.name)}> 刪除 </LinkButton>
                    </>
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
            total={keywords.length}
            limitOptions={[10, 20]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </Card.Body>
      </Card>

      <Modal open={keywordOpen} closeOnDocumentClick={false} onClose={() => setKeywordOpen(false)}>
        <Modal.Header>
          <Modal.Title>新增熱門關鍵字</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label required>關鍵詞</Form.Label>
              <Form.Input
                type="text"
                {...register("keyword", {
                  validate: value => value.length !== 0 || "輸入框內不能為空值",
                })}
              />
              {formState.errors?.keyword?.message && (
                <Form.ErrorMessage>{formState.errors?.keyword?.message}</Form.ErrorMessage>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setKeywordOpen(false)}>
            取消
          </Button>
          <Button
            onClick={() => {
              handleSubmit(handleAdd)()
              setKeywordOpen(false)
            }}>
            新增
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default KeywordCard
