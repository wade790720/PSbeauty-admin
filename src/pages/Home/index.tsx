import { useState } from 'react'
import Card from "components/Card"
import Layout from "components/Layout"
import Form from "components/Form"
import Button from "components/Button"
import NoticeTable from "./NoticeTable"
import CarouselTable from "components/CarouselTable"
import Editor from "components/Editor"
import { Uploader } from 'rsuite';
import CameraRetro from '@rsuite/icons/legacy/CameraRetro';
import Modal from "components/Modal"
import { FileType } from "types";

const Home = () => {
  const [postList, setPostList] = useState<FileType[]>([]);
  const [carouselList, setCarouselList] = useState<FileType[]>([]);
  const [open, setOpen] = useState(false)
  const [openCarousel, setOpenCarousel] = useState(false)

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>首頁</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <Card>
        <Card.Header title="廣告卡列表">
          <Button variant="secondary" onClick={() => setOpen(true)}>新增</Button>
        </Card.Header>
        <Card.Body>
          <NoticeTable />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="輪播">
          <Button variant="secondary" onClick={() => setOpenCarousel(true)}>新增</Button>
        </Card.Header>
        <Card.Body>
          <CarouselTable />
        </Card.Body>
      </Card>
      <Modal
        title="新增廣告卡"
        open={open}
        confirmText="建立"
        cancelText="取消"
        onConfirm={() => { console.log("onConfirm") }}
        onClose={() => setOpen(false)}
      >
        <Modal.Body>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label required>預覽圖</Form.Label>
              <Uploader
                listType="picture"
                action="//jsonplaceholder.typicode.com/posts/"
                disabled={postList.length > 0}
                onChange={(fileList: FileType[]) => {
                  setPostList(fileList)
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
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        title="新增輪播圖"
        open={openCarousel}
        confirmText="新增"
        cancelText="取消"
        onConfirm={() => { console.log("onConfirm") }}
        onClose={() => setOpenCarousel(false)}
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
              <Form.Label>超連結</Form.Label>
              <Form.Input type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Home