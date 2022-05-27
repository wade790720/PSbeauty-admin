import { useState } from 'react'
import Card from "components/Card"
import Layout from "components/Layout"
import CarouselPreview from "components/CarouselPreview"
import Form from "components/Form"
import Button from "components/Button"
import NoticeTable from "./NoticeTable"
import AdvertisementTable from "./AdvertisementTable"
import Editor from "components/Editor"
import { Uploader } from 'rsuite';
import CameraRetro from '@rsuite/icons/legacy/CameraRetro';

interface FileType {
  /** File Name */
  name?: string;
  /** File unique identifier */
  fileKey?: number | string;

  /** File upload status */
  status?: 'inited' | 'uploading' | 'error' | 'finished';

  /** File upload status */
  progress?: number;

  /** The url of the file can be previewed. */
  url?: string;
}

const Home = () => {
  const [fileList, setFileList] = useState<FileType[]>([]);

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>首頁</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <Card>
        <Card.Header title="公告" />

        <Card.Body>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label required>預覽圖</Form.Label>
              <Uploader
                listType="picture"
                action="//jsonplaceholder.typicode.com/posts/"
                disabled={fileList.length > 0}
                onChange={(fileList: FileType[]) => {
                  setFileList(fileList)
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
            <Form.Group layout="vertical" style={{ height: '200px' }}>
              <Form.Label required>內容</Form.Label>
              <Editor />
            </Form.Group>
            <Button style={{ marginRight: "10px" }}>發送</Button>
            <Button variant="secondary">清空</Button>
          </Form>
          <NoticeTable />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="輪播" />
        <Card.Body>
          <CarouselPreview />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="廣告卡列表" />
        <Card.Body>
          <AdvertisementTable />
        </Card.Body>
      </Card>
    </>
  )
}

export default Home