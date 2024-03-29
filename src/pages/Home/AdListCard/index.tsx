import { useState, useMemo } from "react"
import { Table } from "rsuite"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Modal from "components/Modal"
import Editor from "components/Editor"
import ImageUploader from "components/ImageUploader"
import {
  GetHomeQuery,
  useAddAdCardMutation,
  useUpdateAdCardMutation,
  useDeleteAdCardMutation,
} from "../Home.graphql.generated"
import { useForm, FormProvider } from "react-hook-form"

type AdListCardProps = {
  data: GetHomeQuery["adCards"]
}

type Card = {
  index: number
  id: string
  title: string
  image: string
  content: string
}

type AddInputs = {
  title: string
  image: string
  content: string
}

type EditInputs = {
  id: string
  title: string
  image: string
  content: string
}

const AdListCard = ({ data }: AdListCardProps) => {
  const { Column, HeaderCell, Cell } = Table

  const methods = useForm<AddInputs>({ mode: "onTouched" })
  const editMethods = useForm<EditInputs>({ mode: "onTouched" })
  const [open, setOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)

  const adCardsList = useMemo(() => {
    if (!data?.edges) return []

    return data?.edges?.map((card, index) => ({
      index: index + 1,
      id: card.node?.id || "",
      title: card.node?.title || "",
      content: card.node?.content || "",
      image: card.node?.image || "",
    }))
  }, [data])

  const [addAdCardMutation] = useAddAdCardMutation({ refetchQueries: ["GetHome"] })
  const [updateAdCardMutation] = useUpdateAdCardMutation({ refetchQueries: ["GetHome"] })
  const [deleteAdCardMutation] = useDeleteAdCardMutation({ refetchQueries: ["GetHome"] })

  const handleCreate = async () => {
    const { image, title, content } = methods.getValues()
    await addAdCardMutation({
      variables: {
        image,
        title,
        content,
      },
    })
    methods.reset({ title: "", content: "" })
  }

  const handleUpdate = () => {
    const { id, title, content, image } = editMethods.getValues()

    updateAdCardMutation({
      variables: {
        id,
        image,
        content,
        title,
      },
    })
    setReviewOpen(false)
  }

  const handleDelete = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteAdCardMutation({
        variables: {
          id,
        },
      })
  }

  return (
    <Card>
      <Card.Header title="廣告卡列表">
        <Button variant="secondary" onClick={() => setOpen(true)}>
          新增
        </Button>
      </Card.Header>
      <Card.Body>
        <Table height={400} data={adCardsList}>
          <Column width={70} align="center" fixed>
            <HeaderCell>序號</HeaderCell>
            <Cell dataKey="index" />
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
                return (
                  <span>
                    <LinkButton
                      onClick={() => {
                        setReviewOpen(true)
                        editMethods.reset({
                          id: rowData.id,
                          title: rowData.title,
                          content: rowData.content,
                          image: rowData.image,
                        })
                      }}>
                      編輯
                    </LinkButton>{" "}
                    | <LinkButton onClick={() => handleDelete(rowData.id)}> 刪除 </LinkButton>
                  </span>
                )
              }}
            </Cell>
          </Column>
        </Table>

        {/* 新增廣告卡 */}
        {open && (
          <Modal open={open} backdrop={false} onClose={() => setOpen(false)}>
            <Modal.Header>
              <Modal.Title>新增廣告卡</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ overflow: "auto", maxHeight: "600px" }}>
              <FormProvider {...methods}>
                <Form>
                  <Form.Group layout="vertical">
                    <Form.Label required>預覽圖 (800px x 800px)</Form.Label>
                    <ImageUploader
                      onChange={url => {
                        methods.setValue("image", url[0])
                      }}
                    />
                  </Form.Group>
                  <Form.Group layout="vertical">
                    <Form.Label required>標題</Form.Label>
                    <Form.Input
                      type="text"
                      {...methods.register("title", {
                        validate: value => value.length !== 0 || "輸入框內不能為空值",
                      })}
                    />
                    {methods.formState.errors?.title?.message && (
                      <Form.ErrorMessage>
                        {methods.formState.errors?.title?.message}
                      </Form.ErrorMessage>
                    )}
                  </Form.Group>
                  <Form.Group layout="vertical" style={{ height: "200px" }}>
                    <Form.Label>內容</Form.Label>
                    <Editor name="content" />
                  </Form.Group>
                </Form>
              </FormProvider>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                取消
              </Button>
              <Button
                onClick={() => {
                  methods.handleSubmit(handleCreate)()
                  setOpen(false)
                }}>
                建立
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* 檢視廣告卡資訊 */}
        <Modal
          open={reviewOpen}
          backdrop={false}
          onClose={() => setReviewOpen(false)}
          style={{ maxWidth: "450px" }}>
          <Modal.Header>
            <Modal.Title>廣告卡資訊</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ overflow: "auto", maxHeight: "600px" }}>
            <FormProvider {...editMethods}>
              <Form>
                <Form.Group layout="vertical">
                  <Form.Label>預覽圖 (800px x 800px)</Form.Label>
                  <ImageUploader
                    disabled={!!editMethods.watch("image")}
                    defaultFileList={[
                      {
                        fileKey: editMethods?.getValues().id,
                        url: editMethods.getValues().image,
                      },
                    ]}
                    onChange={urlList => {
                      editMethods.setValue("image", urlList[0])
                    }}
                  />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>標題</Form.Label>
                  <Form.Input
                    placeholder="請輸入輪播標題"
                    {...editMethods.register("title", {
                      required: "此欄位為必填",
                      validate: value => value.length !== 0 || "輸入框內不能為空值",
                    })}
                  />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>內容</Form.Label>
                  <Editor name="content" height={400} />
                </Form.Group>
              </Form>
            </FormProvider>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setReviewOpen(false)}>
              取消
            </Button>
            <Button onClick={handleUpdate}>儲存</Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  )
}

export default AdListCard
