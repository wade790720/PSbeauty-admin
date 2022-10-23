import { useState, useEffect } from "react"
import Button from "components/Button"
import Card from "components/Card"
import Modal from "components/Modal"
import Form from "components/Form"
import { useForm } from "react-hook-form"
import {
  GetSettingQuery,
  useAddKeywordMutation,
  useDeleteKeywordMutation,
  useSetPopularKeywordsMutation,
} from "../SystemSettings.graphql.generated"
import List from "../components/List"
import { ReactSortable } from "react-sortablejs"

type KeywordCardProps = {
  data: GetSettingQuery["popularKeywords"]
}

type Inputs = {
  keyword: string
}

type Keyword = {
  id: number
  name: string | null
}

const KeywordCard = ({ data }: KeywordCardProps) => {
  const { register, getValues, formState, handleSubmit, reset } = useForm<Inputs>({
    mode: "onTouched",
  })

  const [keywordOpen, setKeywordOpen] = useState(false)
  const [keywordList, setKeywordList] = useState<Keyword[]>([])

  const [addKeywordMutation] = useAddKeywordMutation({ refetchQueries: ["GetSetting"] })
  const [deleteKeywordMutation] = useDeleteKeywordMutation({ refetchQueries: ["GetSetting"] })
  const [setPopularKeywordsMutation] = useSetPopularKeywordsMutation()

  const handleAdd = async () => {
    await addKeywordMutation({
      variables: {
        keyword: getValues().keyword,
      },
    })
    reset({ keyword: "" })
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

  const handleKeywordSort = (newState: Keyword[]) => {
    if (JSON.stringify(newState) !== JSON.stringify(keywordList)) {
      setPopularKeywordsMutation({
        variables: {
          keywords: newState.map(state => state.name),
        },
      })
      setKeywordList(newState)
    }
  }

  useEffect(() => {
    const words =
      data?.keywords?.map((word, index) => ({
        id: index + 1,
        name: word,
      })) || []

    setKeywordList(words)
  }, [data])

  return (
    <>
      <Card>
        <Card.Header title="熱門關鍵字設定">
          <Button variant="secondary" onClick={() => setKeywordOpen(true)}>
            新增
          </Button>
        </Card.Header>
        <Card.Body>
          <List>
            <ReactSortable
              list={keywordList}
              setList={newState => handleKeywordSort(newState)}
              animation={200}
              delay={2}>
              {keywordList.map(keyword => (
                <List.Item
                  key={keyword.id}
                  value={keyword.name + ""}
                  onRemove={() => {
                    handleDelete(keyword.name + "")
                  }}>
                  {keyword.name}
                </List.Item>
              ))}
            </ReactSortable>
          </List>
        </Card.Body>
      </Card>

      <Modal open={keywordOpen} backdrop={false} onClose={() => setKeywordOpen(false)}>
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
