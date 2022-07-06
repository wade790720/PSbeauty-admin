import { useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Modal from "components/Modal"
import Editor from "components/Editor"
import { Table, Pagination, MultiCascader } from "rsuite"
import { FileType } from "rsuite/Uploader"
import categoryData from "../category.json"
import {
  CasesFragment,
  useAddCaseMutation,
  useUpdateCaseMutation,
  useDeleteCaseMutation,
} from "../ClinicDetail.graphql.generated"
import ImageUploader from "components/ImageUploader"
import { useForm } from "react-hook-form"
import CosmeticMultiCascader from "components/CosmeticMultiCascader"

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

type AddInputs = {
  title: string
}

type EditInputs = {
  title: string
  category: string
  categories: string[]
  description: string
  imageList: string[]
}

const CaseCard = ({ data }: CaseCardProps) => {
  const AddForm = useForm<AddInputs>({ mode: "onTouched" })
  const EditForm = useForm<EditInputs>({ mode: "onTouched" })
  const { Column, HeaderCell, Cell } = Table
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [addCaseMutation] = useAddCaseMutation({ refetchQueries: ["GetClinic"] })
  const [updateCaseMutation] = useUpdateCaseMutation({ refetchQueries: ["GetClinic"] })
  const [deleteCaseMutation] = useDeleteCaseMutation({ refetchQueries: ["GetClinic"] })

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

  const handleDelete = (id: string) => {
    console.log(id)
  }

  return (
    <>
      <Card>
        <Card.Header title="案例列表">
          <Button variant="secondary" onClick={() => setOpenAdd(true)}>
            新增
          </Button>
        </Card.Header>
        <Card.Body>
          <Table height={400} data={cases}>
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
        </Card.Body>
      </Card>
      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <Modal.Header>
          <Modal.Title>新增案例</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label>預覽圖 (700 x 800px)</Form.Label>
              <ImageUploader />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>標題</Form.Label>
              <Form.Input
                type="text"
                {...AddForm.register("title", {
                  validate: value => value.length !== 0 || "輸入框內不能為空值",
                })}
              />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>分類</Form.Label>
              <CosmeticMultiCascader />
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenAdd(false)}>
            取消
          </Button>
          <Button
            onClick={() => {
              console.log("onConfirm")
              setOpenAdd(false)
            }}>
            新增
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Modal.Header>
          <Modal.Title>編輯案例</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label>預覽圖 (700 x 800px)</Form.Label>
              <ImageUploader />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>標題</Form.Label>
              <Form.Input
                type="text"
                {...EditForm.register("title", {
                  validate: value => value.length !== 0 || "輸入框內不能為空值",
                })}
              />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>分類</Form.Label>
              <CosmeticMultiCascader />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>內容</Form.Label>
              <Editor
                height={400}
                initialValue={editCase.description}
                onEdit={newValue => {
                  setEditCase({ ...editCase, description: newValue })
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenEdit(false)}>
            取消
          </Button>
          <Button
            onClick={() => {
              console.log("onConfirm")
              setOpenEdit(false)
            }}>
            修改
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default CaseCard
