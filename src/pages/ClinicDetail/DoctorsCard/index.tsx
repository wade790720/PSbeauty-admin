import { useMemo, useRef, useState } from "react"
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
  useDeleteDoctorMutation,
} from "../ClinicDetail.graphql.generated"
import { useForm, FormProvider } from "react-hook-form"

type DoctorsCardProps = {
  data: DoctorsFragment["doctors"]
}

type Doctor = {
  id?: string
  index?: number
  title: string
  name: string
  expertise: string
  resumes: string
  photo: string
}

type Inputs = {
  name: string
  expertise: string
  photo: string
  resumes: string
  title: string
}

const DoctorsCard = ({ data }: DoctorsCardProps) => {
  const { Column, HeaderCell, Cell } = Table
  const match = useMatch("/cms/cosmetic-clinic/:id")
  const methods = useForm<Inputs>({ mode: "onTouched" })
  const [openAdd, setOpenAdd] = useState(false)
  const [openReview, setOpenReview] = useState(false)
  const reviewDoctor = useRef<Doctor>()

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

  const handleDelete = (id: string) => {
    const ask = confirm("???????????????????")
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
        <Card.Header title="????????????">
          <Button variant="secondary" onClick={() => setOpenAdd(true)}>
            ??????
          </Button>
        </Card.Header>
        <Card.Body>
          <Table height={400} data={doctors}>
            <Column width={70} align="center" fixed>
              <HeaderCell>??????</HeaderCell>
              <Cell dataKey="index" />
            </Column>

            <Column width={160} fixed>
              <HeaderCell>??????</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={160} fixed>
              <HeaderCell>??????</HeaderCell>
              <Cell dataKey="title" />
            </Column>

            <Column width={300} flexGrow={1}>
              <HeaderCell>??????</HeaderCell>
              <Cell dataKey="expertise" />
            </Column>

            <Column width={120} fixed="right">
              <HeaderCell>??????</HeaderCell>
              <Cell>
                {rowData => {
                  return (
                    <span>
                      <LinkButton
                        onClick={() => {
                          setOpenReview(true)
                          reviewDoctor.current = {
                            id: rowData.id,
                            index: rowData.index,
                            name: rowData.name,
                            title: rowData.title,
                            expertise: rowData.expertise,
                            photo: rowData.photo,
                            resumes: rowData.resumes,
                          }
                        }}>
                        {" "}
                        ??????{" "}
                      </LinkButton>{" "}
                      | <LinkButton onClick={() => handleDelete(rowData.id)}> ?????? </LinkButton>
                    </span>
                  )
                }}
              </Cell>
            </Column>
          </Table>
        </Card.Body>
      </Card>
      {openAdd && (
        <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
          <Modal.Header>
            <Modal.Title>????????????</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ overflow: "auto", height: "500px" }}>
            <FormProvider {...methods}>
              <Form>
                <Form.Group layout="vertical">
                  <Form.Label>?????? (100 x 100px)</Form.Label>
                  <ImageUploader
                    onChange={urlList => {
                      methods.setValue("photo", urlList[0])
                    }}
                  />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label required>??????</Form.Label>
                  <Form.Input
                    type="text"
                    {...methods.register("name", {
                      required: "??????????????????",
                      validate: value => value.length !== 0 || "???????????????????????????",
                    })}
                  />
                  {methods.formState.errors?.name?.message && (
                    <Form.ErrorMessage>{methods.formState.errors?.name?.message}</Form.ErrorMessage>
                  )}
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>??????</Form.Label>
                  <Form.Input type="text" {...methods.register("title")} />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>??????</Form.Label>
                  <Form.Input type="text" {...methods.register("expertise")} />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>??????</Form.Label>
                  <Editor name="resumes" />
                </Form.Group>
              </Form>
            </FormProvider>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpenAdd(false)}>
              ??????
            </Button>
            <Button
              onClick={() => {
                methods.handleSubmit(handleAdd)()
                setOpenAdd(false)
              }}>
              ??????
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal open={openReview} onClose={() => setOpenReview(false)} style={{ maxWidth: "450px" }}>
        <Modal.Header>
          <Modal.Title>????????????</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto", height: "500px" }}>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label>????????? (100 x 100px)</Form.Label>
              <img
                src={reviewDoctor.current?.photo}
                alt="preview"
                style={{ border: "1px solid #e4e6ef" }}
              />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>??????</Form.Label>
              <p>{reviewDoctor.current?.name}</p>
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>??????</Form.Label>
              <p>{reviewDoctor.current?.title}</p>
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>??????</Form.Label>
              <p>{reviewDoctor.current?.expertise}</p>
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>??????</Form.Label>
              <div dangerouslySetInnerHTML={{ __html: reviewDoctor.current?.resumes || "" }} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenReview(false)}>
            ??????
          </Button>
          <Button onClick={() => setOpenReview(false)}>??????</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DoctorsCard
