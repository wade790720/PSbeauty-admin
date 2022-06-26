import { useState, useMemo } from "react"
import Modal from "components/Modal"
import Form from "components/Form"
import Button, { LinkButton } from "components/Button"
import { Table, Pagination, Toggle } from "rsuite"
import { ReactComponent as DefaultPhoto } from "./DefaultPhoto.svg"
import Card from "components/Card"
import { Uploader } from "rsuite"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"
import { FileType } from "rsuite/Uploader"
import { GetClinicQuery } from "../Clinic.graphql.generated"

const fakeData = [
  {
    id: 1,
    status: "open",
    title: "測試輪播",
    url: "/home",
    createTime: "2022-04-18",
  },
]

type CarouselCardProps = {
  data: GetClinicQuery["adImages"]
}

const CarouselCard = ({ data }: CarouselCardProps) => {
  const { Column, HeaderCell, Cell } = Table

  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [carouselList, setCarouselList] = useState<FileType[]>([])
  const [openCarousel, setOpenCarousel] = useState(false)

  const imageList = useMemo(() => {
    if (!data?.edges) return []

    return data?.edges?.map((card, index) => ({
      index: index + 1,
      id: card.node?.id || "",
      status: card.node?.status === true ? "開啟" : "關閉",
      url: card.node?.redirectType + "/" + card.node?.targetId,
    }))
  }, [data?.edges])

  const handleChangeLimit = (dataKey: number) => {
    setPage(1)
    setLimit(dataKey)
  }

  return (
    <>
      <Card>
        <Card.Header title="輪播">
          <Button variant="secondary" onClick={() => setOpenCarousel(true)}>
            新增
          </Button>
        </Card.Header>
        <Card.Body>
          <Table height={400} data={imageList}>
            <Column width={70} align="center" fixed>
              <HeaderCell>序號</HeaderCell>
              <Cell dataKey="index" />
            </Column>

            <Column width={70} align="center" fixed>
              <HeaderCell>狀態</HeaderCell>
              <Cell dataKey="status" />
            </Column>

            <Column width={200} fixed>
              <HeaderCell>標題</HeaderCell>
              <Cell dataKey="title" />
            </Column>

            <Column width={200} flexGrow={1}>
              <HeaderCell>超連結</HeaderCell>
              <Cell dataKey="url" />
            </Column>

            <Column width={200}>
              <HeaderCell>創建時間</HeaderCell>
              <Cell dataKey="createTime" />
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
                      <LinkButton onClick={() => setOpen(true)}> 編輯 </LinkButton> |{" "}
                      <LinkButton onClick={handleAction}> 刪除 </LinkButton>
                    </span>
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
            total={fakeData.length}
            limitOptions={[10, 20]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </Card.Body>
      </Card>

      <Modal
        title="新增輪播圖"
        open={openCarousel}
        confirmText="新增"
        cancelText="取消"
        onConfirm={() => {
          console.log("onConfirm")
        }}
        onClose={() => setOpenCarousel(false)}>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label>預覽圖 (350 x 135px)</Form.Label>
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
            <Form.Label required>標題</Form.Label>
            <Form.Input type="text" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>超連結</Form.Label>
            <Form.Input type="text" />
          </Form.Group>
        </Form>
      </Modal>

      <Modal
        title="編輯"
        open={open}
        confirmText="儲存"
        cancelText="取消"
        onConfirm={() => {
          console.log("onConfirm")
        }}
        onClose={() => setOpen(false)}>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label>預覽圖</Form.Label>
            <DefaultPhoto
              style={{ width: "350px", height: "135px", border: "1px solid #e4e6ef" }}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>標題</Form.Label>
            <Form.Input type="text" value="測試輪播" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>超連結</Form.Label>
            <Form.Input type="text" value="/url" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>狀態</Form.Label>
            <Toggle defaultChecked />
          </Form.Group>
        </Form>
      </Modal>
    </>
  )
}

export default CarouselCard