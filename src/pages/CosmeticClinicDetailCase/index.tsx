import Card from "components/Card"
import Form from "components/Form"
import Button from "components/Button"
import { ReactComponent as DefaultPhoto } from "./DefaultPhoto.svg"

const CosmeticClinicDetailCase = () => {
  return (
    <Card>
      <Card.Header title="案例詳情" />
      <Card.Body>
        <DefaultPhoto style={{ width: '50px', height: '50px', margin: '5px' }} />
        <DefaultPhoto style={{ width: '50px', height: '50px', margin: '5px' }} />
        <Form>
          <Form.Group layout="vertical">
            <Form.Label required>案例標題</Form.Label>
            <Form.Input type="text" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>大分類</Form.Label>
            <select name="" id=""></select>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>小分類</Form.Label>
            <Form.Checkbox>小分類1</Form.Checkbox>
            <Form.Checkbox>小分類2</Form.Checkbox>
            <Form.Checkbox>小分類3</Form.Checkbox>
            <Form.Checkbox>小分類4</Form.Checkbox>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>案例內容</Form.Label>
            <Form.Textarea style={{ height: "100px" }} />
          </Form.Group>
          <Button style={{ marginRight: "10px" }}>儲存修改</Button>
          <Button variant="secondary">取消</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default CosmeticClinicDetailCase