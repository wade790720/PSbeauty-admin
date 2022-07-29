import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import styled from "./ContactCard.module.scss"
import dayjs from "dayjs"
import { useForm } from "react-hook-form"
import {
  GetClinicDetailQuery,
  useUpdateClinicContactMutation,
  useUpdateClinicPaymentMutation,
} from "../ClinicDetail.graphql.generated"

type ContactCardProps = {
  data: GetClinicDetailQuery["clinic"]
}

type Inputs = {
  contactName: string
  contactPhone: string
  contactEmail: string
  paySets: number
}

const ContactCard = ({ data }: ContactCardProps) => {
  const { register, getValues, formState, handleSubmit, reset } = useForm<Inputs>({
    mode: "onTouched",
    defaultValues: {
      contactName: data?.contactName || "",
      contactPhone: data?.contactPhone || "",
      contactEmail: data?.contactEmail || "",
    },
  })

  const [updateClinicContactMutation] = useUpdateClinicContactMutation()
  const [updateClinicPaymentMutation] = useUpdateClinicPaymentMutation()

  const handleSave = async () => {
    const { contactName, contactEmail, contactPhone, paySets } = getValues()
    const responseContact = await updateClinicContactMutation({
      variables: {
        id: data?.id || "",
        contactName,
        contactEmail,
        contactPhone,
      },
    })
    // const responsePayment = await updateClinicPaymentMutation({
    //   variables: {
    //     id: data?.id || "",
    //     paySets,
    //   },
    // })

    if (responseContact.data) {
      alert("儲存成功！")
    } else {
      alert(`儲存失敗！ ${responseContact.errors}`)
    }
  }

  const handleClear = () => {
    reset({ contactName: "", contactEmail: "", contactPhone: "" })
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
          {/* <div className={styled.block}>
            <div className={styled.title}>付款狀態</div>
            <div className={styled.content}>{data?.paid === true ? "已付款" : "尚未付款"}</div>
          </div> */}
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
              {...register("contactName", {
                validate: value => value.length !== 0 || "輸入框內不能為空值",
              })}
            />
            {formState.errors?.contactName?.message && (
              <Form.ErrorMessage className={styled["error-message"]}>
                {formState.errors?.contactName?.message}
              </Form.ErrorMessage>
            )}
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>電話</Form.Label>
            <Form.Input
              type="tel"
              {...register("contactPhone", {
                validate: value => value.length !== 0 || "輸入框內不能為空值",
              })}
            />
            {formState.errors?.contactPhone?.message && (
              <Form.ErrorMessage className={styled["error-message"]}>
                {formState.errors?.contactPhone?.message}
              </Form.ErrorMessage>
            )}
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>信箱</Form.Label>
            <Form.Input
              type="email"
              {...register("contactEmail", {
                required: "此欄位為必填",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "請輸入有效的電子郵件地址",
                },
              })}
            />
            {formState.errors?.contactEmail?.message && (
              <Form.ErrorMessage className={styled["error-message"]}>
                {formState.errors?.contactEmail?.message}
              </Form.ErrorMessage>
            )}
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>付費組數</Form.Label>
            <Form.Input type="number" {...register("paySets")} />
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
