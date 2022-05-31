import { useState } from 'react'
import ClinicTable from "./ClinicTable"
import Button from "components/Button"
import Form from "components/Form"
import Card from "components/Card"
import Modal from "components/Modal"
import Layout from "components/Layout"
import Editor from "components/Editor"
import CarouselTable from "components/CarouselTable"
import { Uploader, CheckTreePicker } from 'rsuite';
import CameraRetro from '@rsuite/icons/legacy/CameraRetro';
import { FileType } from "types";
import data from './category.json';

const CosmeticClinic = () => {
  const [open, setOpen] = useState(false)
  const [openCarousel, setOpenCarousel] = useState(false)
  const [carouselList, setCarouselList] = useState<FileType[]>([]);

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>診所</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <Card>
        <Card.Header title="輪播">
          <Button variant="secondary" onClick={() => setOpenCarousel(true)}>新增</Button>
          <Modal
            title="新增輪播圖"
            open={openCarousel}
            confirmText="新增"
            cancelText="取消"
            onConfirm={() => { console.log("onConfirm") }}
            onClose={() => setOpenCarousel(false)}
          >
            <Form>
              <Form.Group layout="vertical">
                <Form.Label>預覽圖 (350 x 135px)</Form.Label>
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
          </Modal>
        </Card.Header>
        <Card.Body>
          <CarouselTable />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="診所" >
          <Button variant="secondary" onClick={() => setOpen(true)}>新增診所</Button>
          <Modal
            title="新增診所"
            open={open}
            confirmText="新增"
            cancelText="取消"
            onClose={() => setOpen(false)}
          >
            <div className="px-5 mb-5" style={{ overflow: 'auto', height: '500px' }}>
              <Form>
                <Form.Group layout="vertical">
                  <Form.Label required>診所名稱</Form.Label>
                  <Form.Input type="text" />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label required>大分類</Form.Label>
                  <CheckTreePicker data={data} style={{ width: 280 }} />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label required>電子信箱</Form.Label>
                  <Form.Input type="email" />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>完整地址</Form.Label>
                  <div className="inline-flex w-full">
                    <Form.Input type="text" placeholder='縣市' className="mr-4" style={{ flex: "1 1 300px" }} />
                    <Form.Input type="text" placeholder='地區' className="mr-4" style={{ flex: "1 1 300px" }} />
                    <Form.Input type="text" placeholder='地址' />
                  </div>
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>診所網址</Form.Label>
                  <Form.Input type="url" />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>診所電話</Form.Label>
                  <Form.Input type="tel" />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>診所介紹</Form.Label>
                  <Editor />
                </Form.Group>
              </Form>
            </div>
          </Modal>
        </Card.Header>
        <Card.Body>
          <ClinicTable />
        </Card.Body>
      </Card>
    </>
  )
}

export default CosmeticClinic