import { useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"

import { ReactComponent as DefaultPhoto } from "./DefaultPhoto.svg"
import Form from "components/Form"
import Modal from "components/Modal"
import Editor from "components/Editor"
import { FileType } from "rsuite/Uploader"
import { Table, Uploader } from "rsuite"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"

const fakeData = [
  {
    id: 1,
    name: "楊效誠",
    title: "院長",
    skill: "顏面疤痕 / 雙眼皮手術 / 眼袋 / 眼瞼下垂 / 醫學美容光療雷射 / 微整形注射美容",
  },
]

const TeamCard = () => {
  const { Column, HeaderCell, Cell } = Table
  const [openAdd, setOpenAdd] = useState(false)
  const [openReview, setOpenReview] = useState(false)
  const [carouselList, setCarouselList] = useState<FileType[]>([])

  return (
    <>
      <Card>
        <Card.Header title="醫療團隊">
          <Button variant="secondary" onClick={() => setOpenAdd(true)}>
            新增
          </Button>
        </Card.Header>
        <Card.Body>
          <Table
            height={400}
            data={fakeData}
            onRowClick={data => {
              console.log(data)
            }}>
            <Column width={70} align="center" fixed>
              <HeaderCell>序號</HeaderCell>
              <Cell dataKey="id" />
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
              <Cell dataKey="skill" />
            </Column>

            <Column width={120} fixed="right">
              <HeaderCell>動作</HeaderCell>
              <Cell>
                {rowData => {
                  function handleAction() {
                    alert(`id:${rowData.id}`)
                  }
                  return (
                    <span>
                      <LinkButton onClick={() => setOpenReview(true)}> 檢視 </LinkButton> |{" "}
                      <LinkButton onClick={handleAction}> 刪除 </LinkButton>
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
        onClose={() => setOpenAdd(false)}>
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
            <Form.Input type="text" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>專長</Form.Label>
            <Form.Input type="text" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>經歷</Form.Label>
            <Editor
              onEdit={newValue => {
                console.log(newValue)
              }}
            />
          </Form.Group>
        </Form>
      </Modal>
      <Modal
        title="醫師資訊"
        open={openReview}
        confirmText="確定"
        cancelText="取消"
        onConfirm={() => {
          console.log("onConfirm")
        }}
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
            <p>楊效誠</p>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>職稱</Form.Label>
            <p>院長</p>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>專長</Form.Label>
            <p>顏面疤痕 / 雙眼皮手術 / 眼袋 / 眼瞼下垂 / 醫學美容光療雷射 / 微整形注射美容</p>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>經歷</Form.Label>
            <p>內容..</p>
          </Form.Group>
        </Form>
      </Modal>
    </>
  )
}

export default TeamCard
