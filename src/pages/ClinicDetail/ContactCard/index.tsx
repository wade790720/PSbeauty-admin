import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import styled from "./ContactCard.module.scss"
import dayjs from "dayjs"
import { useForm } from "react-hook-form"
import { GetClinicQuery, useUpdateClinicContactMutation } from "../ClinicDetail.graphql.generated"

type ContactCardProps = {
  data: GetClinicQuery["clinic"]
}

type Inputs = {
  name: string
  phone: string
  email: string
}

const ContactCard = ({ data }: ContactCardProps) => {
  const { register, watch, formState, handleSubmit, reset } = useForm<Inputs>({
    mode: "onTouched",
    defaultValues: {
      name: data?.contactName || "",
      phone: data?.contactPhone || "",
      email: data?.contactEmail || "",
    },
  })
  const watchFields = watch()

  const [updateClinicContactMutation] = useUpdateClinicContactMutation()

  const handleSave = () => {
    updateClinicContactMutation({
      variables: {
        id: data?.id || "",
        contactName: watchFields.name,
        contactEmail: watchFields.email,
        contactPhone: watchFields.phone,
      },
    })
  }

  const handleClear = () => {
    reset({ name: "", phone: "", email: "" })
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
            <Form.Label>姓名</Form.Label>
            <Form.Input
              type="text"
              value={watchFields.name}
              {...register("name", {
                validate: value => value.length !== 0 || "輸入框內不能為空值",
              })}
            />
            {formState.errors?.name?.message && (
              <Form.ErrorMessage className={styled["error-message"]}>
                {formState.errors?.name?.message}
              </Form.ErrorMessage>
            )}
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>電話</Form.Label>
            <Form.Input
              type="tel"
              value={watchFields.phone}
              {...register("phone", {
                validate: value => value.length !== 0 || "輸入框內不能為空值",
              })}
            />
            {formState.errors?.phone?.message && (
              <Form.ErrorMessage className={styled["error-message"]}>
                {formState.errors?.phone?.message}
              </Form.ErrorMessage>
            )}
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>信箱</Form.Label>
            <Form.Input
              type="email"
              value={watchFields.email}
              {...register("email", {
                required: "此欄位為必填",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "請輸入有效的電子郵件地址",
                },
              })}
            />
            {formState.errors?.email?.message && (
              <Form.ErrorMessage className={styled["error-message"]}>
                {formState.errors?.email?.message}
              </Form.ErrorMessage>
            )}
          </Form.Group>
          <div className="flex justify-end">
            <Button style={{ marginRight: "10px" }} onClick={handleSubmit(handleSave)}>
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
