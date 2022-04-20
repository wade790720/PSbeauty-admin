import { useState } from 'react'
import Button from "components/Button"
import Card from "components/Card"
import Info from "./Info"
import CaseTable from "./CaseTable"
import MedicalTeamTable from "./MedicalTeamTable"
import Form from "components/Form"
import Modal from "components/Modal"
import Layout from "components/Layout"

const CosmeticClinicDetail = () => {
  const [open, setOpen] = useState(false);

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
            <Button style={{ marginRight: "10px" }}>儲存修改</Button>
            <Button variant="secondary">取消</Button>
          </Form>
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
            <img src="http://kenshin.hk/blog/archive/iryu/iryu-03.jpg" alt="" />
            <Form>
              <Form.Group layout="vertical">
                <Form.Label required>姓名</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>專長</Form.Label>
                <Form.Checkbox>小分類1</Form.Checkbox>
                <Form.Checkbox>小分類2</Form.Checkbox>
                <Form.Checkbox>小分類3</Form.Checkbox>
                <Form.Checkbox>小分類4</Form.Checkbox>
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>經歷</Form.Label>
                <Form.Textarea style={{ height: "100px" }} />
              </Form.Group>
            </Form>
          </Modal>
        </Card.Header>
        <Card.Body>
          <MedicalTeamTable />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="案例列表">
          <Button variant="secondary">新增</Button>
        </Card.Header>
        <Card.Body>
          <Info />
          <CaseTable />
        </Card.Body>
      </Card>
    </>
  )
}

export default CosmeticClinicDetail
