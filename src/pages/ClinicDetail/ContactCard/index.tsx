import { useMemo } from "react"
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
  useUpdateClinicOwnerMutation,
} from "../ClinicDetail.graphql.generated"
import { toast } from "react-toastify"

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
  const clinic = useMemo(() => {
    return {
      id: data?.id || "",
      contactName: data?.contactName || "",
      contactPhone: data?.contactPhone || "",
      contactEmail: data?.contactEmail || "",
      paySets: data?.paySets || 0,
    }
  }, [data])

  const { register, getValues, formState, handleSubmit, reset } = useForm<Inputs>({
    mode: "onTouched",
    defaultValues: {
      contactName: clinic.contactName,
      contactPhone: clinic.contactPhone,
      contactEmail: clinic.contactEmail,
      paySets: clinic.paySets,
    },
  })

  const [updateClinicContactMutation] = useUpdateClinicContactMutation()
  const [updateClinicOwnerMutation] = useUpdateClinicOwnerMutation()
  const [updateClinicPaymentMutation] = useUpdateClinicPaymentMutation({
    refetchQueries: ["GetClinicDetail"],
  })

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

    const responsePayment = await updateClinicPaymentMutation({
      variables: {
        id: data?.id || "",
        paySets: +paySets,
      },
    })
    const responseOwner = await updateClinicOwnerMutation({
      variables: {
        id: data?.id || "",
        ownerEmail: contactEmail,
      },
    })

    if (responseContact.errors && responsePayment.errors && responseOwner.errors) {
      toast.error(`儲存失敗：${responseContact.errors}`, {
        theme: "colored",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast.success("儲存成功！", {
        theme: "colored",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
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
