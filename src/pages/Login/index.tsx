import styled from "./Login.module.scss"
import { ReactComponent as Logo } from "./images/logo.svg"
import Form, { InputGroup, Append } from "components/Form"
import Button from "components/Button"
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { setStorageValue } from "hooks/useLocalStorage"
import { useGo } from "components/Router"
import { endpoint, headers } from "utils/apiConfig"
import axios from "axios"
import { gql } from "@apollo/client"
import { print } from "graphql"
import { useForm } from "react-hook-form"

const CUSTOM_TOKEN = gql`
  query {
    customToken {
      customToken
      uid
    }
  }
`

type Inputs = {
  email: string
  password: string
}

export default function Login() {
  const go = useGo()
  const { register, watch, formState, handleSubmit } = useForm<Inputs>({ mode: "onTouched" })
  const watchFields = watch()

  const login = async () => {
    // Get firebase token
    const userCredential = await signInWithEmailAndPassword(
      auth,
      watchFields.email,
      watchFields.password,
    )
    const idToken = await userCredential.user.getIdToken(true)

    // Get customToken for graphql
    const requestHeaders = { headers: headers(idToken) }
    const query = { query: print(CUSTOM_TOKEN) }
    const customToken = await axios.post(endpoint, query, requestHeaders)
    setStorageValue("token", customToken.data.data.customToken.customToken)

    if (customToken) go.toHome()
  }

  return (
    <div className={styled.wrapper}>
      <div className={styled.outer}>
        <div className={styled.card}>
          <div className={styled.inner}>
            <div className={styled.header}>
              <Logo />
              <span>PSbeauty</span>
            </div>
            <div className={styled.hello}>歡迎來到後臺管理系統! 👋</div>
            <div className={styled.tip}>請登錄您的帳戶並開始冒險</div>
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
              <div className={styled.password}>
                <div>
                  <div className={styled.label}>密碼</div>
                  <div className={styled.forget} onClick={go.toForgetPassword}>
                    忘記密碼了嗎?
                  </div>
                </div>
                <InputGroup className={styled["enter-input"]}>
                  <Form.Input
                    placeholder="請輸入你的密碼"
                    {...register("password", {
                      maxLength: 8,
                      // pattern: {
                      //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                      //   message: "請包含至少8個字符、1個數字、1個大寫和1個小寫",
                      // },
                    })}
                    {...(formState.errors.email && { variant: "invalid" })}
                  />
                  <Append className={styled.append}>
                    <i className="bx bx-hide" />
                  </Append>
                </InputGroup>
                {formState.errors?.password?.message && (
                  <Form.ErrorMessage className={styled["error-message"]}>
                    {formState.errors?.password?.message}
                  </Form.ErrorMessage>
                )}
              </div>
              <Button className={styled.action} onClick={handleSubmit(login)}>
                登入
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
