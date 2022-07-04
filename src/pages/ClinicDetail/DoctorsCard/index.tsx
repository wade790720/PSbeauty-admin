import { useRef, useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"

import { ReactComponent as DefaultPhoto } from "./DefaultPhoto.svg"
import Form from "components/Form"
import Modal from "components/Modal"
import Editor from "components/Editor"
import { FileType } from "rsuite/Uploader"
import { Table, Uploader } from "rsuite"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"
import { useMatch } from "react-router-dom"
import {
  DoctorsFragment,
  useAddDoctorMutation,
  useDeleteDoctorMutation,
} from "../ClinicDetail.graphql.generated"

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

const DoctorsCard = ({ data }: DoctorsCardProps) => {
  const { Column, HeaderCell, Cell } = Table
  const match = useMatch("/cms/cosmetic-clinic/:id")
  const [openAdd, setOpenAdd] = useState(false)
  const [openReview, setOpenReview] = useState(false)
  const [carouselList, setCarouselList] = useState<FileType[]>([])

  const currentDoctor = useRef<Doctor | null>(null)
  const [newDoctor, setNewDoctor] = useState<Doctor>({
    name: "",
    expertise: "",
    photo: "",
    resumes: "",
    title: "",
  })

  const [doctors, setDoctors] = useState(() => {
    return data
      ? data.map((item, index) => ({
          id: item?.id,
          index: index + 1,
          name: item?.name,
          title: item?.title,
          expertise: item?.expertise,
          resumes: item?.resumes,
          photo: item?.photo,
        }))
      : []
  })

  console.log("doctors", doctors)

  const [addDoctorMutation] = useAddDoctorMutation({
    onCompleted: data => {
      setDoctors([
        ...doctors,
        {
          index: doctors[doctors.length - 1].index + 1,
          id: data.addDoctor?.id || "",
          name: newDoctor.name,
          title: newDoctor.title || "",
          expertise: newDoctor.expertise || "",
          resumes: newDoctor?.resumes,
          photo: newDoctor?.photo,
        },
      ])
    },
  })
  const [deleteDoctorMutation] = useDeleteDoctorMutation()

  const handleAdd = () => {
    addDoctorMutation({
      variables: {
        clinicId: match?.params.id || "",
        name: newDoctor.name,
        expertise: newDoctor.expertise,
        photo: newDoctor.photo,
        resumes: newDoctor.resumes,
        title: newDoctor.title,
      },
    })
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
                          currentDoctor.current = {
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
      </Card>
      <Modal
        title="新增醫師"
        open={openAdd}
        confirmText="建立"
        cancelText="取消"
        onClose={() => setOpenAdd(false)}
        style={{ overflow: "auto", maxHeight: "600px" }}>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label>照片 (100 x 100px)</Form.Label>
            <Uploader
              listType="picture"
              action=""
              disabled={carouselList.length > 0}
              onChange={(fileList: FileType[]) => {
                setCarouselList(fileList)
              }}>
              <button>
                <CameraRetro />
              </button>
            </Uploader>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>姓名</Form.Label>
            <Form.Input
              type="text"
              onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value + "" })}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>職稱</Form.Label>
            <Form.Input
              type="text"
              onChange={e => setNewDoctor({ ...newDoctor, title: e.target.value + "" })}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>專長</Form.Label>
            <Form.Input
              type="text"
              onChange={e => setNewDoctor({ ...newDoctor, expertise: e.target.value + "" })}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>經歷</Form.Label>
            <Editor
              height={400}
              onEdit={newValue => {
                setNewDoctor({ ...newDoctor, resumes: newValue })
              }}
            />
          </Form.Group>
        </Form>
      </Modal>
      <Modal
        title="檢視醫師"
        open={openReview}
        confirmText="確定"
        cancelText="取消"
        onClose={() => setOpenReview(false)}
        style={{ maxWidth: "450px" }}>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label>預覽圖 (100 x 100px)</Form.Label>
            <DefaultPhoto
              style={{ width: "100px", height: "100px", border: "1px solid #e4e6ef" }}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>姓名</Form.Label>
            <p>{currentDoctor.current?.name}</p>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>職稱</Form.Label>
            <p>{currentDoctor.current?.title}</p>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>專長</Form.Label>
            <p>{currentDoctor.current?.expertise}</p>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>經歷</Form.Label>
            {/* <div dangerouslySetInnerHTML={{ __html: currentDoctor.current?.resumes || "" }} /> */}
          </Form.Group>
        </Form>
      </Modal>
    </>
  )
}

export default DoctorsCard
