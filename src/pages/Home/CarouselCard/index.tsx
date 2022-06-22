import { useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Modal from "components/Modal"
import { Table, Pagination, Toggle, Uploader } from "rsuite"
import { FileType } from "rsuite/Uploader"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"
import uuid from "utils/uuid"
import { storage } from "../../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import {
  GetHomeQuery,
  useAddAdImageMutation,
  useUpdateAdImageMutation,
  useDeleteAdImageMutation,
} from "../Home.graphql.generated"

type CarouselCardProps = {
  data: GetHomeQuery["adImages"]
}

const CarouselCard = ({ data }: CarouselCardProps) => {
  const { Column, HeaderCell, Cell } = Table

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [fileList, setFileList] = useState<FileType[]>([])
  const [newSlide, setNewSlide] = useState({
    title: "",
    url: "",
    image: "",
    status: false,
  })
  const [prepareUpdate, setPrepareUpdate] = useState({
    id: "",
    index: 0,
    title: "",
    status: false,
    url: "",
    image: "",
  })

  const [slides, setSlides] = useState(() => {
    if (!data?.edges) return []

    return data.edges?.map(card => ({
      index: card.node?.sort || 0,
      id: card.node?.id || "",
      title: card.node?.title || "",
      status: card.node?.status === true ? "開啟" : "關閉",
      url: card.node?.redirectType + "/" + card.node?.targetId,
      image: card.node?.image || "",
    }))
  })

  const [addAdImageMutation] = useAddAdImageMutation({
    onCompleted: data => {
      setSlides([
        ...slides,
        {
          index: slides[slides.length - 1].index + 1,
          id: data.addAdImage?.id || "",
          title: newSlide.title || "",
          url: newSlide.url || "",
          image: newSlide.image || "",
          status: newSlide.status === true ? "開啟" : "關閉",
        },
      ])
    },
  })

  const [updateAdImageMutation] = useUpdateAdImageMutation({
    onCompleted: data => {
      const tmp = slides.map(slide => {
        if (slide.id === data.updateAdImage?.id) {
          return {
            ...slide,
            title: prepareUpdate.title,
            index: prepareUpdate.index,
            status: prepareUpdate.status === true ? "開啟" : "關閉",
          }
        } else {
          return slide
        }
      })
      setSlides(tmp)
    },
  })

  const [deleteAdImageMutation] = useDeleteAdImageMutation({
    onCompleted: data => {
      setSlides(slides.filter(slide => slide.id !== data.deleteAdImage?.id))
    },
  })

  const handleChangeLimit = (dataKey: number) => {
    setPage(1)
    setLimit(dataKey)
  }

  const handleCreate = () => {
    addAdImageMutation({
      variables: {
        usageType: "首頁輪播",
        redirect: "Clinic",
        sort: 2,
        targetId: "clinic_id_xxx",
        image: newSlide.image,
        status: false,
      },
    })
  }

  const handleUpdate = () => {
    console.log(prepareUpdate)
    updateAdImageMutation({
      variables: {
        id: prepareUpdate.id,
        usageType: "首頁輪播",
        title: prepareUpdate.title,
        redirect: "Clinic",
        sort: prepareUpdate.index,
        targetId: "clinic_id_xxx",
        status: prepareUpdate.status,
      },
    })
  }

  const handleDelete = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteAdImageMutation({
        variables: {
          id,
        },
      })
  }

  const onChangeUploader = (fileList: FileType[]) => {
    const fileToUpload = fileList[0].blobFile
    const fileName = fileList[0].name || ""
    const newRef = ref(storage, `image/${uuid()}/${fileName}`)
    const uploadTask = uploadBytesResumable(newRef, fileToUpload as Blob)
    setFileList(fileList)

    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log(snapshot.bytesTransferred)
      },
      err => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setNewSlide({ ...newSlide, image: url + "" })
        })
      },
    )
  }

  return (
    <>
      <Card>
        <Card.Header title="輪播">
          <Button variant="secondary" onClick={() => setOpenAddModal(true)}>
            新增
          </Button>
        </Card.Header>
        <Card.Body>
          <Table height={400} data={slides}>
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

            <Column width={120} fixed="right">
              <HeaderCell>動作</HeaderCell>
              <Cell>
                {rowData => {
                  return (
                    <span>
                      <LinkButton
                        onClick={() => {
                          setOpenEditModal(true)
                          setPrepareUpdate({
                            id: rowData.id,
                            title: rowData.title,
                            status: rowData.status === "開啟" ? true : false,
                            url: rowData.url,
                            image: rowData.image,
                            index: rowData.index,
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
            total={slides.length}
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
        open={openAddModal}
        confirmText="新增"
        cancelText="取消"
        onConfirm={handleCreate}
        onClose={() => setOpenAddModal(false)}>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label>預覽圖 (700 x 800px)</Form.Label>
            <Uploader
              listType="picture"
              action=""
              fileList={fileList}
              autoUpload={false}
              disabled={fileList.length > 0}
              onChange={onChangeUploader}>
              <button>
                <CameraRetro />
              </button>
            </Uploader>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>標題</Form.Label>
            <Form.Input
              type="text"
              onChange={e => setNewSlide({ ...newSlide, title: e.target.value + "" })}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>超連結</Form.Label>
            <Form.Input
              type="text"
              onChange={e => setNewSlide({ ...newSlide, url: e.target.value + "" })}
            />
          </Form.Group>
        </Form>
      </Modal>

      <Modal
        title="編輯"
        open={openEditModal}
        confirmText="儲存"
        cancelText="取消"
        onConfirm={handleUpdate}
        onClose={() => setOpenEditModal(false)}>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label>預覽圖</Form.Label>
            <img
              src={prepareUpdate?.image}
              alt="preview"
              style={{ width: "350px", height: "135px", border: "1px solid #e4e6ef" }}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>標題</Form.Label>
            <Form.Input
              type="text"
              value={prepareUpdate?.title}
              onChange={e => setPrepareUpdate({ ...prepareUpdate, title: e.target.value + "" })}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>順序</Form.Label>
            <Form.Input
              type="number"
              value={prepareUpdate?.index}
              onChange={e =>
                setPrepareUpdate({ ...prepareUpdate, index: parseInt(e.target.value) })
              }
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>超連結</Form.Label>
            <Form.Input
              type="text"
              value={prepareUpdate?.url}
              onChange={e => setPrepareUpdate({ ...prepareUpdate, url: e.target.value + "" })}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>狀態</Form.Label>
            <Toggle
              defaultChecked={prepareUpdate?.status}
              onChange={checked => setPrepareUpdate({ ...prepareUpdate, status: checked })}
            />
          </Form.Group>
        </Form>
      </Modal>
    </>
  )
}

export default CarouselCard
