import { useGo } from "components/Router";
import { useState } from 'react'
import { Table, Pagination } from 'rsuite';
import { LinkButton } from "components/Button"
import Modal from "components/Modal"
import CameraRetro from '@rsuite/icons/legacy/CameraRetro';
import { FileType } from "types";
import Editor from "components/Editor"
import Form from "components/Form"
import { Uploader, CheckTreePicker } from 'rsuite';
import data from '../category.json';

const fakeData = [
  {
    "id": 1,
    "title": "音波拉提比對圖",
    "category": "顏面疤痕 / 雙眼皮手術 / 眼袋"
  },
]

const CaseTable = () => {
  const go = useGo();
  const { Column, HeaderCell, Cell } = Table
  const [openCase, setOpenCase] = useState(false);
  const [carouselList, setCarouselList] = useState<FileType[]>([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

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
                alert(`id:${rowData.id}`);
              }
              return (
                <span>
                  <LinkButton onClick={() => setOpenCase(true)}> 編輯 </LinkButton> | <LinkButton onClick={handleAction}> 刪除 </LinkButton>
                  <Modal
                    title="編輯案例"
                    open={openCase}
                    confirmText="修改"
                    cancelText="取消"
                    onConfirm={() => { console.log("onConfirm") }}
                    onClose={() => setOpenCase(false)}
                  >
                    <Modal.Body>
                      <Form>
                        <Form.Group layout="vertical">
                          <Form.Label>預覽圖 (700 x 800px)</Form.Label>
                          <Uploader
                            listType="picture"
                            action="//jsonplaceholder.typicode.com/posts/"
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
                          <CheckTreePicker data={data} style={{ width: 280 }} />
                        </Form.Group>
                        <Form.Group layout="vertical">
                          <Form.Label>內容</Form.Label>
                          <Editor />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </span>
              );
            }}
          </Cell>
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={fakeData.length}
          limitOptions={[10, 20]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </>
  );
};

export default CaseTable;
