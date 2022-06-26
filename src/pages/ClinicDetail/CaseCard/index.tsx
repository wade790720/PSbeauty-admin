import { useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Modal from "components/Modal"
import Editor from "components/Editor"
import { Table, Pagination, Uploader, MultiCascader } from "rsuite"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"
import { FileType } from "rsuite/Uploader"
import data from "../category.json"
import styled from "./CaseCard.module.scss"

const fakeData = [
  {
    id: 1,
    title: "音波拉提比對圖",
    category: "顏面疤痕 / 雙眼皮手術 / 眼袋",
  },
]

const CaseCard = () => {
  const { Column, HeaderCell, Cell } = Table
  const [openCase, setOpenCase] = useState(false)
  const [carouselList, setCarouselList] = useState<FileType[]>([])

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const handleChangeLimit = (dataKey: number) => {
    setPage(1)
    setLimit(dataKey)
  }

  return (
    <Card>
      <Card.Header title="案例列表">
        <Button variant="secondary" onClick={() => setOpenCase(true)}>
          新增
        </Button>
        <Modal
          title="新增案例"
          open={openCase}
          confirmText="新增"
          cancelText="取消"
          onConfirm={() => {
            console.log("onConfirm")
          }}
          onClose={() => setOpenCase(false)}>
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
                data={data}
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
          data={fakeData}
          onRowClick={data => {
            console.log(data)
          }}>
          <Column width={70} align="center" fixed>
            <HeaderCell>序號</HeaderCell>
            <Cell dataKey="id" />
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
                function handleAction() {
                  alert(`id:${rowData.id}`)
                }
                return (
                  <span>
                    <LinkButton onClick={() => setOpenCase(true)}> 編輯 </LinkButton> |{" "}
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
        <Modal
          title="編輯案例"
          open={openCase}
          confirmText="修改"
          cancelText="取消"
          onConfirm={() => {
            console.log("onConfirm")
          }}
          onClose={() => setOpenCase(false)}>
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
                data={data}
                searchable={false}
                menuStyle={{ padding: "6px 0" }}
                style={{ width: "100%" }}
                placeholder="請選擇"
              />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>內容</Form.Label>
              <Editor />
            </Form.Group>
          </Form>
        </Modal>
      </Card.Body>
    </Card>
  )
}
export default CaseCard
