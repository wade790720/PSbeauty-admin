import { useState } from 'react'
import { Table, Pagination } from 'rsuite';
import { LinkButton } from "components/Button"
import Modal from "components/Modal"
import Form from "components/Form"
import { ReactComponent as DefaultPhoto } from "./DefaultPhoto.svg"

const fakeData = [
  {
    "id": 1,
    "title": "New Amieshire",
    "createTime": "2022-04-18",
  },
]

const NoticeTable = () => {
  const { Column, HeaderCell, Cell } = Table

  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  return (
    <>
      <Table
        height={400}
        data={fakeData}
        onRowClick={data => {
          console.log(data);
        }}
      >
        <Column width={70} align="center" fixed>
          <HeaderCell>序號</HeaderCell>
          <Cell dataKey="id" />
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
              function handleAction() {
                alert(`id:${rowData.id}`);
              }
              return (
                <span>
                  <LinkButton onClick={() => setOpen(true)}> 預覽圖 </LinkButton> | <LinkButton onClick={handleAction}> 刪除 </LinkButton>
                </span>
              );
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
        layout={['-', 'limit', '|', 'pager', 'skip']}
        total={fakeData.length}
        limitOptions={[10, 20]}
        limit={limit}
        activePage={page}
        onChangePage={setPage}
        onChangeLimit={handleChangeLimit}
      />
      <Modal
        title="廣告卡資訊"
        open={open}
        confirmText="確定"
        cancelText="取消"
        onConfirm={() => { console.log("onConfirm") }}
        onClose={() => setOpen(false)}
        style={{ maxWidth: '450px' }}
      >
        <Form>
          <Form.Group layout="vertical">
            <Form.Label>預覽圖 (390 x 240px)</Form.Label>
            <DefaultPhoto style={{ width: '390px', height: '240px', border: '1px solid #e4e6ef' }} />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>標題</Form.Label>
            <p>全新臉部拉提計畫</p>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>內容</Form.Label>
            <p>從台北皮膚科起家，北中南共有十六間醫美診，另外還有四間頂級SPA，旗艦店座落在熱鬧的東區跟台北火車站周遭，網友熱門討論項目大都集中在面部雷射光療，以及肉毒桿菌醫學美容，解決不少有咀嚼肌困擾的愛美女孩煩惱，讓臉部線條更明顯，另外ＸＸ診所也設置「ＸＸ學院」，將醫師與相關工作人員，與設備原廠合作認證課程，相關紀錄都在官網可見，讓消費者更安心
              網友熱門討論項目大都集中在面部雷射光療，以及肉毒桿菌醫學美容，解決不少有咀嚼肌困擾的愛美女孩煩惱，讓臉部線條更明顯。</p>
          </Form.Group>
        </Form>
      </Modal>
    </>
  )
}

export default NoticeTable