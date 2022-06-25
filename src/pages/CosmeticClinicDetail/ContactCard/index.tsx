import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"

const ContactCard = () => {
  return (
    <Card>
      <Card.Header title="聯絡人資訊" />
      <Card.Body>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label required>姓名</Form.Label>
            <Form.Input type="text" value="王院長" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>電話</Form.Label>
            <Form.Input type="tel" value="02-2395-1167" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>信箱</Form.Label>
            <Form.Input type="email" value="test@gmail.com" />
          </Form.Group>
          <div className="flex justify-end">
            <Button style={{ marginRight: "10px" }}>儲存</Button>
            <Button variant="secondary">清除</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ContactCard
