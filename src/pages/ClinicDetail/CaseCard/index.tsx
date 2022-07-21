import cx from "classnames"
import { useMemo, useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Modal from "components/Modal"
import Editor from "components/Editor"
import { Table, Pagination } from "rsuite"
import { FileType } from "rsuite/Uploader"
import {
  CasesFragment,
  useAddCaseMutation,
  useUpdateCaseMutation,
  useDeleteCaseMutation,
} from "../ClinicDetail.graphql.generated"
import ImageUploader from "components/ImageUploader"
import { useMatch } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import CosmeticMultiCascader from "components/CosmeticMultiCascader"

type CaseCardProps = {
  data: CasesFragment["cases"]
}

type AddInputs = {
  title: string
  categories: string[]
  description: string
  imageList: FileType[]
  beforeImage: string
  beforeImageText: string
  afterImage: string
  afterImageText: string
}

type EditInputs = {
  id: string
  title: string
  categories: string[]
  description: string
  imageList: FileType[]
  beforeImage: string
  beforeImageText: string
  afterImage: string
  afterImageText: string
}

const CaseCard = ({ data }: CaseCardProps) => {
  const match = useMatch("/cms/cosmetic-clinic/:id")
  const addMethods = useForm<AddInputs>({ mode: "onTouched" })
  const editMethods = useForm<EditInputs>({ mode: "onTouched" })
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

  const cases = useMemo(() => {
    if (!data) return []

    return data.map((item, index) => ({
      id: item?.id,
      index: index + 1,
      title: item?.title,
      category: item?.categories?.reduce((acc, current) => acc + " / " + current?.name, ""),
      categories: item?.categories?.map(item => item?.id),
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
  }, [data])

  const handleAdd = () => {
    const {
      categories,
      description,
      title,
      beforeImage,
      beforeImageText,
      afterImage,
      afterImageText,
    } = addMethods.getValues()

    addCaseMutation({
      variables: {
        clinicId: match?.params.id || "",
        beforeImage,
        beforeImageText,
        afterImage,
        afterImageText,
        categories,
        description,
        hot: false,
        title,
      },
    })
  }

  const handleUpdate = () => {
    const { id, categories, description, title } = editMethods.getValues()
    updateCaseMutation({
      variables: {
        id,
        beforeImage: "",
        beforeImageText: "",
        afterImage: "",
        afterImageText: "",
        categories,
        description,
        hot: false,
        title,
      },
    })
    setOpenEdit(false)
  }

  const handleDelete = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteCaseMutation({
        variables: {
          id,
        },
      })
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
                          editMethods.reset({
                            id: rowData.id,
                            title: rowData.title,
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
        <Modal.Body style={{ overflow: "auto", height: "500px" }}>
          <FormProvider {...addMethods}>
            <Form>
              <Form.Group layout="vertical">
                <Form.Label>案例圖 (700 x 800px)</Form.Label>
                <div className={cx("flex w-full")}>
                  <div className="flex-1 mr-1">
                    <ImageUploader
                      listType="picture"
                      onChange={urlList => {
                        addMethods.setValue("beforeImage", urlList[0])
                      }}
                    />
                    <Form.Input
                      type="text"
                      placeholder="術前描述"
                      {...addMethods.register("beforeImageText")}
                    />
                  </div>
                  <div className="flex-1">
                    <ImageUploader
                      listType="picture"
                      onChange={urlList => {
                        addMethods.setValue("afterImage", urlList[0])
                      }}
                    />
                    <Form.Input
                      type="text"
                      placeholder="術後描述"
                      {...addMethods.register("afterImageText")}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>標題</Form.Label>
                <Form.Input
                  type="text"
                  {...addMethods.register("title", {
                    validate: value => value.length !== 0 || "輸入框內不能為空值",
                  })}
                />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>分類</Form.Label>
                <CosmeticMultiCascader name="categories" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>內容</Form.Label>
                <Editor name="description" />
              </Form.Group>
            </Form>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenAdd(false)}>
            取消
          </Button>
          <Button onClick={addMethods.handleSubmit(handleAdd)}>新增</Button>
        </Modal.Footer>
      </Modal>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Modal.Header>
          <Modal.Title>編輯案例</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto", height: "500px" }}>
          <FormProvider {...editMethods}>
            <Form>
              <Form.Group layout="vertical">
                <Form.Label>案例圖 (700 x 800px)</Form.Label>
                <div className={cx("flex w-full")}>
                  <div className="flex-1 mr-1">
                    <ImageUploader
                      listType="picture"
                      defaultFileList-={editMethods.getValues().imageList[0]}
                      onChange={urlList => {
                        editMethods.setValue("beforeImage", urlList[0])
                      }}
                    />
                    <Form.Input
                      type="text"
                      placeholder="術前描述"
                      {...editMethods.register("beforeImageText")}
                    />
                  </div>
                  <div className="flex-1">
                    <ImageUploader
                      listType="picture"
                      onChange={urlList => {
                        editMethods.setValue("afterImage", urlList[0])
                      }}
                    />
                    <Form.Input
                      type="text"
                      placeholder="術後描述"
                      {...editMethods.register("afterImageText")}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>標題</Form.Label>
                <Form.Input
                  type="text"
                  {...editMethods.register("title", {
                    validate: value => value.length !== 0 || "輸入框內不能為空值",
                  })}
                />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>分類</Form.Label>
                <CosmeticMultiCascader name="categories" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>內容</Form.Label>
                <Editor name="description" height={400} />
              </Form.Group>
            </Form>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenEdit(false)}>
            取消
          </Button>
          <Button onClick={editMethods.handleSubmit(handleUpdate)}>修改</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default CaseCard
