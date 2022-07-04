import { useState, useRef } from "react"
import Button, { LinkButton } from "components/Button"
import { Table, Pagination, Uploader } from "rsuite"
import Card from "components/Card"
import Form from "components/Form"
import Modal from "components/Modal"
import Editor from "components/Editor"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"
import { storage } from "../../../firebase"
import { FileType } from "rsuite/Uploader"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import {
  GetHomeQuery,
  useAddAdCardMutation,
  useDeleteAdCardMutation,
} from "../Home.graphql.generated"
import uuid from "utils/uuid"

type AdListCardProps = {
  data: GetHomeQuery["adCards"]
}

type Card = {
  index: number
  id: string
  title: string
  content: string
  image: string
}

const AdListCard = ({ data }: AdListCardProps) => {
  const { Column, HeaderCell, Cell } = Table

  const [open, setOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [fileList, setFileList] = useState<FileType[]>([])
  const activeCard = useRef<Card | null>(null)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: "",
  })

  const [adCardsList, setAdCardsList] = useState(() => {
    if (!data?.edges) return []

    return data?.edges?.map((card, index) => ({
      index: index + 1,
      id: card.node?.id || "",
      title: card.node?.title || "",
      content: card.node?.content || "",
      image: card.node?.image || "",
    }))
  })

  const [addAdCardMutation] = useAddAdCardMutation({
    onCompleted: data => {
      setAdCardsList([
        {
          index: 1,
          id: data.addAdCard?.id || "",
          title: newPost.title || "",
          content: newPost.content || "",
          image: newPost.image || "",
        },
        ...adCardsList.map(adCard => ({
          ...adCard,
          index: adCard.index + 1,
        })),
      ])
    },
  })

  const [deleteAdCardMutation] = useDeleteAdCardMutation({
    onCompleted: data => {
      setAdCardsList(adCardsList.filter(card => card.id !== data.deleteAdCard?.id))
    },
  })

  const handleChangeLimit = (dataKey: number) => {
    setPage(1)
    setLimit(dataKey)
  }

  const onChangeUploader = (fileList: FileType[]) => {
    const fileToUpload = fileList[0].blobFile
    const fileName = fileList[0].name || ""
    const newRef = ref(storage, `image/${uuid()}/${fileName}`)
    const uploadTask = uploadBytesResumable(newRef, fileToUpload as Blob)

    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log(snapshot.bytesTransferred)
      },
      err => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setFileList(fileList)
          setNewPost({ ...newPost, image: url + "" })
        })
      },
    )
  }

  const create = () => {
    addAdCardMutation({
      variables: {
        image: newPost.image,
        title: newPost.title,
        content: newPost.content,
      },
    })
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
                        activeCard.current = {
                          index: rowData.index,
                          id: rowData.id,
                          title: rowData.title,
                          content: rowData.content,
                          image: rowData.image,
                        }
                      }}>
                      預覽
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
          total={adCardsList.length}
          limitOptions={[10, 20]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />

        {/* 新增廣告卡 */}
        <Modal
          title="新增廣告卡"
          open={open}
          confirmText="建立"
          cancelText="取消"
          onConfirm={create}
          closeOnDocumentClick={false}
          style={{ overflow: "auto", maxHeight: "600px" }}
          onClose={() => setOpen(false)}>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label required>預覽圖</Form.Label>
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
                onChange={e => setNewPost({ ...newPost, title: e.target.value + "" })}
              />
            </Form.Group>
            <Form.Group layout="vertical" style={{ height: "200px" }}>
              <Form.Label required>內容</Form.Label>
              <Editor
                onEdit={newValue => {
                  setNewPost({ ...newPost, content: newValue + "" })
                }}
              />
            </Form.Group>
          </Form>
        </Modal>

        {/* 檢視廣告卡資訊 */}
        <Modal
          title="廣告卡資訊"
          open={reviewOpen}
          confirmText="確定"
          cancelText="取消"
          onClose={() => setReviewOpen(false)}
          style={{ maxWidth: "450px" }}>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label>預覽圖 (390 x 240px)</Form.Label>
              <img
                src={activeCard.current?.image}
                alt="preview"
                style={{ width: "390px", height: "240px", border: "1px solid #e4e6ef" }}
              />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>標題</Form.Label>
              <p>{activeCard.current?.title}</p>
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>內容</Form.Label>
              <div dangerouslySetInnerHTML={{ __html: activeCard.current?.content || "" }} />
            </Form.Group>
          </Form>
        </Modal>
      </Card.Body>
    </Card>
  )
}

export default AdListCard
