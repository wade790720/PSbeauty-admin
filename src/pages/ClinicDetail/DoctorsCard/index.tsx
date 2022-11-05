import { useMemo, useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Modal from "components/Modal"
import Editor from "components/Editor"
import ImageUploader from "components/ImageUploader"
import { Table } from "rsuite"
import { useMatch } from "react-router-dom"
import {
  DoctorsFragment,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} from "../ClinicDetail.graphql.generated"
import { useForm, FormProvider } from "react-hook-form"

type DoctorsCardProps = {
  data: DoctorsFragment["doctors"]
}

type Inputs = {
  name: string
  expertise: string
  photo: string
  resumes: string
  title: string
}

type EditInputs = {
  id: string
  title: string
  name: string
  expertise: string
  resumes: string
  photo: string
}

const DoctorsCard = ({ data }: DoctorsCardProps) => {
  const { Column, HeaderCell, Cell } = Table
  const match = useMatch("/cms/cosmetic-clinic/:id")
  const methods = useForm<Inputs>({ mode: "onTouched" })
  const editedMethods = useForm<EditInputs>({ mode: "onTouched" })
  const [openAdd, setOpenAdd] = useState(false)
  const [openReview, setOpenReview] = useState(false)

  const doctors = useMemo(() => {
    if (!data) return []

    return data.map((item, index) => ({
      id: item?.id,
      index: index + 1,
      name: item?.name,
      title: item?.title,
      expertise: item?.expertise,
      resumes: item?.resumes,
      photo: item?.photo,
    }))
  }, [data])

  const [addDoctorMutation] = useAddDoctorMutation({ refetchQueries: ["GetClinicDetail"] })
  const [updateDoctorMutation] = useUpdateDoctorMutation({ refetchQueries: ["GetClinicDetail"] })
  const [deleteDoctorMutation] = useDeleteDoctorMutation({ refetchQueries: ["GetClinicDetail"] })

  const handleAdd = () => {
    const { name, title, photo, expertise, resumes } = methods.getValues()
    addDoctorMutation({
      variables: {
        clinicId: match?.params.id || "",
        name,
        title,
        photo,
        resumes,
        expertise,
      },
    })
  }

  const handleUpdate = () => {
    const { id, name, title, photo, expertise, resumes } = editedMethods.getValues()

    updateDoctorMutation({
      variables: {
        id,
        clinicId: match?.params.id || "",
        name,
        title,
        photo,
        resumes,
        expertise,
      },
    })
    setOpenReview(false)
  }

  const handleDelete = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteDoctorMutation({
        variables: {
          id,
        },
      })
  }

  return (
    <>
      <Card>
        <Card.Header title="醫療團隊">
          <Button variant="secondary" onClick={() => setOpenAdd(true)}>
            新增
          </Button>
        </Card.Header>
        <Card.Body>
          <Table height={400} data={doctors}>
            <Column width={70} align="center" fixed>
              <HeaderCell>序號</HeaderCell>
              <Cell dataKey="index" />
            </Column>

            <Column width={160} fixed>
              <HeaderCell>姓名</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={160} fixed>
              <HeaderCell>職稱</HeaderCell>
              <Cell dataKey="title" />
            </Column>

            <Column width={300} flexGrow={1}>
              <HeaderCell>專長</HeaderCell>
              <Cell dataKey="expertise" />
            </Column>

            <Column width={120} fixed="right">
              <HeaderCell>動作</HeaderCell>
              <Cell>
                {rowData => {
                  return (
                    <span>
                      <LinkButton
                        onClick={() => {
                          setOpenReview(true)
                          console.log(rowData.id)
                          editedMethods.reset({
                            id: rowData.id,
                            name: rowData.name,
                            title: rowData.title,
                            expertise: rowData.expertise,
                            photo: rowData.photo,
                            resumes: rowData.resumes,
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

      {/* 新增醫生 */}
      {openAdd && (
        <Modal open={openAdd} backdrop={false} onClose={() => setOpenAdd(false)}>
          <Modal.Header>
            <Modal.Title>新增醫師</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ overflow: "auto", height: "500px" }}>
            <FormProvider {...methods}>
              <Form>
                <Form.Group layout="vertical">
                  <Form.Label>照片 (700px x 700px)</Form.Label>
                  <ImageUploader
                    onChange={urlList => {
                      methods.setValue("photo", urlList[0])
                    }}
                  />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label required>姓名</Form.Label>
                  <Form.Input
                    type="text"
                    {...methods.register("name", {
                      required: "此欄位為必填",
                      validate: value => value.length !== 0 || "輸入框內不能為空值",
                    })}
                  />
                  {methods.formState.errors?.name?.message && (
                    <Form.ErrorMessage>{methods.formState.errors?.name?.message}</Form.ErrorMessage>
                  )}
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>職稱</Form.Label>
                  <Form.Input type="text" {...methods.register("title")} />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>專長</Form.Label>
                  <Form.Input type="text" {...methods.register("expertise")} />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>經歷</Form.Label>
                  <Editor name="resumes" />
                </Form.Group>
              </Form>
            </FormProvider>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpenAdd(false)}>
              取消
            </Button>
            <Button
              onClick={() => {
                methods.handleSubmit(handleAdd)()
                setOpenAdd(false)
              }}>
              建立
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* 編輯醫師 */}
      <Modal
        open={openReview}
        backdrop={false}
        onClose={() => setOpenReview(false)}
        style={{ maxWidth: "450px" }}>
        <Modal.Header>
          <Modal.Title>編輯醫師</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto", height: "500px" }}>
          <FormProvider {...editedMethods}>
            <Form>
              <Form.Group layout="vertical">
                <Form.Label>預覽圖 (100 x 100px)</Form.Label>
                <img
                  src={editedMethods.getValues().photo}
                  alt="preview"
                  style={{ border: "1px solid #e4e6ef" }}
                />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>姓名</Form.Label>
                <Form.Input
                  type="text"
                  {...editedMethods.register("name", {
                    required: "此欄位為必填",
                    validate: value => value.length !== 0 || "輸入框內不能為空值",
                  })}
                />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>職稱</Form.Label>
                <Form.Input type="text" {...editedMethods.register("title")} />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>專長</Form.Label>
                <Form.Input type="text" {...editedMethods.register("expertise")} />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>經歷</Form.Label>
                <Editor name="resumes" />
              </Form.Group>
            </Form>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenReview(false)}>
            取消
          </Button>
          <Button onClick={handleUpdate}>確定</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DoctorsCard
