import styled from "./Register.module.scss"
import { ReactComponent as Logo } from "./images/logo.svg"
import Form, { InputGroup, Append } from "components/Form"
import Button from "components/Button"
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
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

export default function Register() {
  const go = useGo()
  const { register, watch, formState } = useForm<Inputs>({
    mode: "onTouched",
  })
  const watchFields = watch()

  const create = async () => {
    // Get firebase token
    const userCredential = await createUserWithEmailAndPassword(
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
            <div className={styled.hello}>建立您的 PSbeauty 後台管理帳戶 </div>
            <div className={styled.tip}>請輸入您的帳戶與密碼</div>
            <Form>
              <div className={styled.account}>
                <div className={styled.label}>信箱</div>
                <InputGroup className={styled["enter-input"]}>
                  <Form.Input
                    placeholder="請輸入你的信箱"
                    {...register("email", {
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email",
                      },
                    })}
                    {...(formState.errors.email && { variant: "invalid" })}
                  />
                  {formState.errors?.email?.message && (
                    <Form.ErrorMessage className={styled["error-message"]}>
                      {formState.errors?.email?.message}
                    </Form.ErrorMessage>
                  )}
                </InputGroup>
              </div>
              <div className={styled.password}>
                <div>
                  <div className={styled.label}>密碼</div>
                </div>
                <InputGroup className={styled["enter-input"]}>
                  <Form.Input
                    placeholder="請輸入你的密碼"
                    {...register("password", {
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                        message: "請包含至少8個字符、1個數字、1個大寫和1個小寫",
                      },
                    })}
                  />
                  <Append className={styled.append}>
                    <i className="bx bx-hide" />
                  </Append>
                </InputGroup>
              </div>
              <Button className={styled.action} onClick={create}>
                註冊
              </Button>
            </Form>
            <div className={styled["create-new-count"]}>
              <a onClick={go.toLogin}>
                <span>請改為登錄帳戶</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
