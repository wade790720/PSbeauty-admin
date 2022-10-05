import styled from "./ForgetPassword.module.scss"
import logo from "./images/logo.png"
import Form, { InputGroup } from "components/Form"
import Button from "components/Button"
import { auth } from "../../firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import { useGo } from "components/Router"
import { useForm } from "react-hook-form"

type Inputs = {
  email: string
}

export default function ForgetPassword() {
  const go = useGo()
  const { register, watch, formState, handleSubmit } = useForm<Inputs>({ mode: "onTouched" })

  const send = async () => {
    if (formState.errors.email) return
    await sendPasswordResetEmail(auth, watch().email)

    window.alert("已發送信件至信箱，請按信件說明重設密碼")
    go.toLogin()
  }

  return (
    <div className={styled.wrapper}>
      <div className={styled.outer}>
        <div className={styled.card}>
          <div className={styled.inner}>
            <div className={styled.header}>
              <img src={logo} alt="logo" width={100} height={100} />
            </div>
            <div className={styled.hello}>尋找您的電子郵件</div>
            <div className={styled.tip}>輸入您的電子郵件地址</div>
            <Form>
              <div className={styled.account}>
                <div className={styled.label}>信箱</div>
                <InputGroup className={styled["enter-input"]}>
                  <Form.Input
                    placeholder="請輸入你的信箱"
                    {...register("email", {
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "請輸入有效的電子郵件地址",
                      },
                    })}
                    {...(formState.errors.email && { variant: "invalid" })}
                  />
                </InputGroup>
                {formState.errors?.email?.message && (
                  <Form.ErrorMessage className={styled["error-message"]}>
                    {formState.errors?.email?.message}
                  </Form.ErrorMessage>
                )}
              </div>
              <Button className={styled.action} onClick={handleSubmit(send)}>
                繼續
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
