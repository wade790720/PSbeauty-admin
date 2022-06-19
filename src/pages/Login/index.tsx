import { useState } from "react"
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

const CUSTOM_TOKEN = gql`
  query {
    customToken {
      customToken
      uid
    }
  }
`

export default function Login() {
  const go = useGo()
  const [user, setUser] = useState({ email: "", password: "" })

  const login = async () => {
    // Get firebase token
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password)
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
                    placeholder="Enter your email"
                    onChange={e => setUser({ ...user, email: e.target.value + "" })}
                  />
                </InputGroup>
              </div>
              <div className={styled.password}>
                <div>
                  <div className={styled.label}>密碼</div>
                  <div className={styled.forget}>忘記密碼了嗎?</div>
                </div>
                <InputGroup className={styled["enter-input"]}>
                  <Form.Input
                    placeholder="Enter your password"
                    onChange={e => setUser({ ...user, password: e.target.value + "" })}
                  />
                  <Append className={styled.append}>
                    <i className="bx bx-hide" />
                  </Append>
                </InputGroup>
              </div>
              {/* <div className={styled.remember}>
                <input type="checkbox" />
                <div className={styled.label}> Remember Me</div>
              </div> */}
              <Button className={styled.action} onClick={login}>
                登入
              </Button>
            </Form>
            <div className={styled["create-new-count"]}>
              <span>還沒有屬於自己的帳號嗎?</span>
              <a>
                <span>開始創建帳號</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
