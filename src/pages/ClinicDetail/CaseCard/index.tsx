import { useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Modal from "components/Modal"
import Editor from "components/Editor"
import { Table, Pagination, Uploader, MultiCascader } from "rsuite"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"
import { FileType } from "rsuite/Uploader"
import categoryData from "../category.json"
import styled from "./CaseCard.module.scss"
import { CasesFragment } from "../ClinicDetail.graphql.generated"
import { storage } from "../../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import uuid from "utils/uuid"

type CaseCardProps = {
  data: CasesFragment["cases"]
}

type Case = {
  id: string
  index: number
  title: string
  category: string
  categories: string[]
  description: string
  imageList: FileType[]
}

const CaseCard = ({ data }: CaseCardProps) => {
  const { Column, HeaderCell, Cell } = Table
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [carouselList, setCarouselList] = useState<FileType[]>([])

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const handleChangeLimit = (dataKey: number) => {
    setPage(1)
    setLimit(dataKey)
  }

  const [cases, setCases] = useState(() => {
    return data
      ? data.map((item, index) => ({
          id: item?.id,
          index: index + 1,
          title: item?.title,
          category: (item?.categories || []).reduce((acc, current) => {
            return acc + " / " + current?.name
          }, ""),
          categories: (item?.categories || []).map(item => item?.id),
          description: item?.description,
          imageList: [
            {
              name: "before",
              fileKey: 1,
              url: item?.beforeImage,
            },
            {
              name: "after",
              fileKey: 2,
              url: item?.afterImage,
            },
          ],
        }))
      : []
  })

  const [editCase, setEditCase] = useState<Case>({
    id: "",
    index: 0,
    title: "",
    category: "",
    categories: [],
    description: "",
    imageList: [],
  })

  const onChangeUploader = (fileList: FileType[]) => {
    const fileToUpload = fileList[0].blobFile
    const fileName = fileList[0].name || ""
    const newRef = ref(storage, `image/${uuid()}/${fileName}`)
    const uploadTask = uploadBytesResumable(newRef, fileToUpload as Blob)
    setEditCase({
      ...editCase,
      imageList: fileList,
    })

    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log(snapshot.bytesTransferred)
      },
      err => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          console.log(url)
        })
      },
    )
  }

  const handleDelete = (id: string) => {
    console.log(id)
  }

  return (
    <Card>
      <Card.Header title="案例列表">
        <Button variant="secondary" onClick={() => setOpenAdd(true)}>
          新增
        </Button>
        <Modal
          title="新增案例"
          open={openAdd}
          confirmText="新增"
          cancelText="取消"
          onConfirm={() => {
            console.log("onConfirm")
          }}
          onClose={() => setOpenAdd(false)}>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label>預覽圖 (700 x 800px)</Form.Label>
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
              <Form.Label required>分類</Form.Label>
              <MultiCascader
                data={categoryData}
                searchable={false}
                menuStyle={{ padding: "6px 0" }}
                style={{ width: "100%" }}
                placeholder="請選擇"
              />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>內容</Form.Label>
              <Editor
                onEdit={newValue => {
                  console.log(newValue)
                }}
              />
            </Form.Group>
          </Form>
        </Modal>
      </Card.Header>
      <Card.Body>
        <div className={styled.info}>
          <div className={styled.block}>
            <div className={styled.title}>回覆數</div>
            <div className={styled.content}>38筆</div>
          </div>
          <div className={styled.block}>
            <div className={styled.title}>上傳組數/付費組數</div>
            <div className={styled.content}>10/30</div>
          </div>
          <div className={styled.block}>
            <div className={styled.title}>最後付款日期</div>
            <div className={styled.content}>2022/04/17</div>
          </div>
        </div>
        <Table
          height={400}
          data={cases}
          onRowClick={data => {
            console.log(data)
          }}>
          <Column width={70} align="center" fixed>
            <HeaderCell>序號</HeaderCell>
            <Cell dataKey="index" />
          </Column>

          <Column width={200} fixed>
            <HeaderCell>標題</HeaderCell>
            <Cell dataKey="title" />
          </Column>

          <Column width={300} flexGrow={1}>
            <HeaderCell>分類</HeaderCell>
            <Cell dataKey="category" />
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>動作</HeaderCell>
            <Cell>
              {rowData => {
                return (
                  <span>
                    <LinkButton
                      onClick={() => {
                        setOpenEdit(true)
                        setEditCase({
                          id: rowData.id,
                          index: rowData.index,
                          title: rowData.title,
                          category: rowData.category,
                          categories: rowData.categories,
                          description: rowData.description,
                          imageList: [
                            {
                              name: "before",
                              fileKey: 1,
                              url: rowData?.beforeImage,
                            },
                            {
                              name: "after",
                              fileKey: 2,
                              url: rowData?.afterImage,
                            },
                          ],
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
          total={cases.length}
          limitOptions={[10, 20]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
        <Modal
          title="編輯案例"
          open={openEdit}
          confirmText="修改"
          cancelText="取消"
          onConfirm={() => {
            console.log("onConfirm")
          }}
          onClose={() => setOpenEdit(false)}>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label>預覽圖 (700 x 800px)</Form.Label>
              <Uploader
                listType="picture"
                action=""
                disabled={editCase.imageList.length > 1}
                defaultFileList={editCase.imageList}
                onChange={onChangeUploader}>
                <button>
                  <CameraRetro />
                </button>
              </Uploader>
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>標題</Form.Label>
              <Form.Input type="text" value={editCase.title} />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>分類</Form.Label>
              <MultiCascader
                data={categoryData}
                searchable={false}
                menuStyle={{ padding: "6px 0" }}
                style={{ width: "100%" }}
                placeholder="請選擇"
              />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>內容</Form.Label>
              <Editor
                height={400}
                value={editCase.description}
                onEdit={newValue => {
                  setEditCase({ ...editCase, description: newValue })
                }}
              />
            </Form.Group>
          </Form>
        </Modal>
      </Card.Body>
    </Card>
  )
}
export default CaseCard
