import { useState } from 'react'
import Button from "components/Button"
import Card from "components/Card"
import CarouselPreview from "components/CarouselPreview"
import ClinicTable from "./ClinicTable"
import Modal from "components/Modal"
import Form from "components/Form"
import Layout from "components/Layout"

const CosmeticClinic = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>診所</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <Card>
        <Card.Header title="輪播" />
        <Card.Body>
          <CarouselPreview />
          {/* <FileUploader name="test" putEP="test"/> */}
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="診所" >
          <Button variant="secondary" onClick={() => setOpen(true)}>新增診所</Button>
          <Modal
            title="新增診所"
            open={open}
            confirmText="建立"
            cancelText="取消"
            onClose={() => setOpen(false)}
          >
            <Form>
              <Form.Group layout="vertical">
                <Form.Label required>診所名稱</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>大分類</Form.Label>
                <Form.Checkbox>大分類1</Form.Checkbox>
                <Form.Checkbox>大分類2</Form.Checkbox>
                <Form.Checkbox>大分類3</Form.Checkbox>
                <Form.Checkbox>大分類4</Form.Checkbox>
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>電子信箱</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>完整地址</Form.Label>
                <Form.Input type="text" placeholder='縣市'/>
                <Form.Input type="text" placeholder='地區'/>
                <Form.Input type="text" placeholder='地址'/>
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>診所網址</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>診所電話</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label>診所介紹</Form.Label>
                <Form.Textarea style={{ height: "100px" }} />
              </Form.Group>
            </Form>
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