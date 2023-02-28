import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Modal from "components/Modal"
import Editor from "components/Editor"
import CosmeticMultiCascader from "components/CosmeticMultiCascader"
import ImageUploader from "components/ImageUploader"
import { useMemo, useState } from "react"
import { useMatch } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { Table } from "rsuite"
import {
  ActivityFragment,
  useAddActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} from "../ClinicDetail.graphql.generated"

type ActivityCardProps = {
  data: ActivityFragment["activities"]
}

type Inputs = {
  subject: string
  content: string
  image: string
  introduction: string
  categories: string[]
}

type EditInputs = {
  id: string
  subject: string
  content: string
  image: string
  introduction: string
  categories: string[]
}

const ActivityCard = ({ data }: ActivityCardProps) => {
  const match = useMatch("/cms/cosmetic-clinic/:id")
  const { Column, HeaderCell, Cell } = Table
  const methods = useForm<Inputs>({ mode: "onTouched" })
  const editMethods = useForm<EditInputs>({ mode: "onTouched" })

  const activities = useMemo(() => {
    return data?.map((activity, index) => ({
      id: activity?.id,
      index: index + 1,
      subject: activity?.subject,
      content: activity?.content,
      image: activity?.image,
    }))
  }, [data])

  const [open, setOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [addActivityMutation] = useAddActivityMutation({ refetchQueries: ["GetClinicDetail"] })
  const [updateActivityMutation] = useUpdateActivityMutation({
    refetchQueries: ["GetClinicDetail"],
  })
  const [deleteActivityMutation] = useDeleteActivityMutation({
    refetchQueries: ["GetClinicDetail"],
  })

  const handleCreate = () => {
    const { image, subject, content, introduction, categories } = methods.getValues()
    addActivityMutation({
      variables: {
        clinicId: match?.params.id || "",
        subject,
        content,
        image,
        // introduction,
      },
    })
  }

  const handleUpdate = () => {
    const { id, image, subject, content, introduction } = editMethods.getValues()
    updateActivityMutation({
      variables: {
        id,
        clinicId: match?.params.id || "",
        subject,
        content,
        image,
      },
    })
    setReviewOpen(false)
  }

  const handleDelete = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteActivityMutation({
        variables: {
          id,
        },
      })
  }

  return (
    <>
      <Card>
        <Card.Header title="活動">
          <Button variant="secondary" onClick={() => setOpen(true)}>
            新增
          </Button>
        </Card.Header>

        <Card.Body>
          <Table height={400} data={activities}>
            <Column width={70} align="center" fixed>
              <HeaderCell>序號</HeaderCell>
              <Cell dataKey="index" />
            </Column>

            <Column width={70} flexGrow={1}>
              <HeaderCell>活動主題</HeaderCell>
              <Cell dataKey="subject" />
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
                            subject: rowData.subject,
                            content: rowData.content,
                            image: rowData.image,
                          })
                        }}>
                        {" "}
                        編輯{" "}
                      </LinkButton>{" "}
                      | <LinkButton onClick={() => handleDelete(rowData.id)}> 刪除 </LinkButton>
                    </span>
                  )
                }}
              </Cell>
            </Column>
          </Table>
        </Card.Body>
      </Card>

      {/* 新增活動 */}
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
                  <Form.Label required>活動主題</Form.Label>
                  <Form.Input
                    type="text"
                    {...methods.register("subject", {
                      validate: value => value.length !== 0 || "輸入框內不能為空值",
                    })}
                  />
                  {methods.formState.errors?.subject?.message && (
                    <Form.ErrorMessage>
                      {methods.formState.errors?.subject?.message}
                    </Form.ErrorMessage>
                  )}
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label required>活動簡介</Form.Label>
                  <Form.Input
                    type="text"
                    {...methods.register("introduction", {
                      validate: value => value.length !== 0 || "輸入框內不能為空值",
                    })}
                  />
                  {methods.formState.errors?.introduction?.message && (
                    <Form.ErrorMessage>
                      {methods.formState.errors?.introduction?.message}
                    </Form.ErrorMessage>
                  )}
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label required>分類</Form.Label>
                  <CosmeticMultiCascader name="categories" />
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
                handleCreate()
                setOpen(false)
              }}>
              建立
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* 編輯廣告卡資訊 */}
      <Modal
        open={reviewOpen}
        backdrop={false}
        onClose={() => setReviewOpen(false)}
        style={{ maxWidth: "450px" }}>
        <Modal.Header>
          <Modal.Title>活動資訊</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto", maxHeight: "600px" }}>
          <FormProvider {...editMethods}>
            <Form>
              <Form.Group layout="vertical">
                <Form.Label>預覽圖</Form.Label>
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
                <Form.Label>活動主題</Form.Label>
                <Form.Input
                  type="text"
                  {...editMethods.register("subject", {
                    validate: value => value.length !== 0 || "輸入框內不能為空值",
                  })}
                />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>活動簡介</Form.Label>
                <Form.Input
                  type="text"
                  {...editMethods.register("introduction", {
                    validate: value => value.length !== 0 || "輸入框內不能為空值",
                  })}
                />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>分類</Form.Label>
                <CosmeticMultiCascader name="categories" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>內容</Form.Label>
                <Editor name="content" />
              </Form.Group>
            </Form>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setReviewOpen(false)}>
            取消
          </Button>
          <Button onClick={handleUpdate}>確定</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ActivityCard
