import { useState } from 'react'
import Button from "components/Button"
import Card from "components/Card"
import Info from "./Info"
import CaseTable from "./CaseTable"
import MedicalTeamTable from "./MedicalTeamTable"
import Form from "components/Form"
import Modal from "components/Modal"
import Layout from "components/Layout"
import Editor from "components/Editor"
import { Uploader, CheckTreePicker } from 'rsuite';
import CameraRetro from '@rsuite/icons/legacy/CameraRetro';
import CarouselTable from "components/CarouselTable"
import { FileType } from "types";
import data from './category.json';

const CosmeticClinicDetail = () => {
  const [open, setOpen] = useState(false);
  const [openCase, setOpenCase] = useState(false);
  const [openCarousel, setOpenCarousel] = useState(false);
  const [carouselList, setCarouselList] = useState<FileType[]>([]);

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item href="#/cms/cosmetic-clinic">診所</Layout.Breadcrumbs.Item>
        <Layout.Breadcrumbs.Item>診所資訊</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <Card>
        <Card.Header title="星采醫學美容診所" />
        <Card.Body>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label required>診所名稱</Form.Label>
              <Form.Input type="text" />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>大小分類</Form.Label>
              <CheckTreePicker data={data} style={{ width: 280 }} />
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
            <Button style={{ marginRight: "10px" }}>儲存</Button>
            <Button variant="secondary">清除</Button>
          </Form>
        </Card.Body>
      </Card>
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
        </Card.Header>
        <Card.Body>
          <CarouselTable />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="案例列表">
          <Button variant="secondary" onClick={() => setOpenCase(true)}>新增</Button>
          <Modal
            title="新增案例"
            open={openCase}
            confirmText="新增"
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
        </Card.Header>
        <Card.Body>
          <Info />
          <CaseTable />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="醫療團隊" >
          <Button variant="secondary" onClick={() => setOpen(true)}>新增</Button>
          <Modal
            title="新增診所"
            open={open}
            confirmText="建立"
            cancelText="取消"
            onClose={() => setOpen(false)}
          >
            <Form>
              <Form.Group layout="vertical">
                <Form.Label>照片 (850 x 315px)</Form.Label>
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
                <Form.Label required>姓名</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>專長</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>經歷</Form.Label>
                <Editor />
              </Form.Group>
            </Form>
          </Modal>
        </Card.Header>
        <Card.Body>
          <MedicalTeamTable />
        </Card.Body>
      </Card>
    </>
  )
}

export default CosmeticClinicDetail
