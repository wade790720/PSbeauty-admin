import { useState } from "react"
import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import styled from "./ContactCard.module.scss"
import dayjs from "dayjs"

import { GetClinicQuery, useUpdateClinicContactMutation } from "../ClinicDetail.graphql.generated"

type ContactCardProps = {
  data: GetClinicQuery["clinic"]
}

const ContactCard = ({ data }: ContactCardProps) => {
  const [contact, setContact] = useState({
    name: data?.contactName || "",
    phone: data?.contactPhone || "",
    email: data?.contactEmail || "",
  })

  const [updateClinicContactMutation] = useUpdateClinicContactMutation()

  const handleSave = () => {
    updateClinicContactMutation({
      variables: {
        id: data?.id || "",
        contactName: contact.name,
        contactEmail: contact.email,
        contactPhone: contact.phone,
      },
    })
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
        <div className={styled.info}>
          <div className={styled.block}>
            <div className={styled.title}>回覆數</div>
            <div className={styled.content}>{data?.consultReplyCount}筆</div>
          </div>
          <div className={styled.block}>
            <div className={styled.title}>上傳組數/付費組數</div>
            <div className={styled.content}>
              {data?.cases?.length} / {data?.paySets}
            </div>
          </div>
          <div className={styled.block}>
            <div className={styled.title}>付款狀態</div>
            <div className={styled.content}>{data?.paid === true ? "已付款" : "尚未付款"}</div>
          </div>
          <div className={styled.block}>
            <div className={styled.title}>最後付款日期</div>
            <div className={styled.content}>
              {dayjs.unix(data?.latestPayAt || 0).format("YYYY-MM-DD")}
            </div>
          </div>
        </div>
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
