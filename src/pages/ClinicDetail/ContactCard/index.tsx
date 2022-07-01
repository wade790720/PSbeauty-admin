import { useState } from "react"
import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"

const ContactCard = () => {
  const [contact, setContact] = useState({
    name: "王院長",
    phone: "02-2395-1167",
    email: "test@gmail.com",
  })

  const handleSave = () => {
    console.log(contact)
  }

  const handleClear = () => {
    setContact({
      name: "",
      phone: "",
      email: "",
    })
  }

  return (
    <Card>
      <Card.Header title="聯絡人資訊" />
      <Card.Body>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label required>姓名</Form.Label>
            <Form.Input
              type="text"
              value={contact.name}
              onChange={e => setContact({ ...contact, name: e.target.value + "" })}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>電話</Form.Label>
            <Form.Input
              type="tel"
              value={contact.phone}
              onChange={e => setContact({ ...contact, phone: e.target.value + "" })}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>信箱</Form.Label>
            <Form.Input
              type="email"
              value={contact.email}
              onChange={e => setContact({ ...contact, email: e.target.value + "" })}
            />
          </Form.Group>
          <div className="flex justify-end">
            <Button style={{ marginRight: "10px" }} onClick={handleSave}>
              儲存
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              清除
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ContactCard
