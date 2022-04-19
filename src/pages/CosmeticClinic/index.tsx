import { useState } from 'react'
import Button from "components/Button"
import Card from "components/Card"
import CarouselPreview from "components/CarouselPreview"
import ClinicTable from "./ClinicTable"
import Modal from "components/Modal"
import Form from "components/Form"

const CosmeticClinic = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
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
                <Form.Label required>大小分類</Form.Label>
                <Form.Checkbox>小分類1</Form.Checkbox>
                <Form.Checkbox>小分類2</Form.Checkbox>
                <Form.Checkbox>小分類3</Form.Checkbox>
                <Form.Checkbox>小分類4</Form.Checkbox>
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>診所介紹</Form.Label>
                <Form.Textarea style={{ height: "100px" }} />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>完整地址</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>診所網址</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>診所電話</Form.Label>
                <Form.Input type="text" />
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