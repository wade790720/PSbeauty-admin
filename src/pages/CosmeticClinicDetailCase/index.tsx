import Card from "components/Card"
import Form from "components/Form"
import Button from "components/Button"
import { ReactComponent as DefaultPhoto } from "./DefaultPhoto.svg"
import Select from "components/Select"

const CosmeticClinicDetailCase = () => {
  const options = [
    { value: "整形手術", eventKey: "vanilla" },
    { value: "皮膚治療", eventKey: "strawberry" },
    { value: "毛髮改善", eventKey: "chocolate" },
    { value: "審美牙科", eventKey: "mango" },
    { value: "微整注射", eventKey: "micro injection" },
    { value: "雷射光療", eventKey: "hazelnut" },
    { value: "身體雕塑", eventKey: "body sculpture" },
    { value: "埋線拉提", eventKey: "lati" },
    { value: "中醫美容", eventKey: "chinese medicine" },
    { value: "其他項目", eventKey: "other" },
  ]

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
            <Select defaultValue={options[0]} placeholder="Select..">
              {options.map(option => (
                <Select.Option key={option.value} value={option.value} eventKey={option.eventKey}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
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