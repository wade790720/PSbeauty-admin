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
import { useState } from "react"

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
  const [errorMessage, setErrorMessage] = useState("")
  const { register, getValues, formState, handleSubmit } = useForm<Inputs>({ mode: "onTouched" })

  const login = async () => {
    // Get firebase token
    const userCredential = await signInWithEmailAndPassword(
      auth,
      getValues().email,
      getValues().password,
    ).then(
      response => {
        setErrorMessage("")
        return response.user.getIdToken(true)
      },
      error => {
        setErrorMessage(error.message)
        return ""
      },
    )
    const idToken = await userCredential

    // Get customToken for graphql
    const requestHeaders = { headers: headers(idToken) }
    const query = { query: print(CUSTOM_TOKEN) }
    const customToken = await axios.post(endpoint, query, requestHeaders)

    if (customToken) {
      setStorageValue("token", customToken.data.data.customToken.customToken)
      go.toHome()
    }
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
            <div className={styled.hello}>??????????????????????????????! ????</div>
            <div className={styled.tip}>????????????????????????????????????</div>
            <Form>
              <div className={styled.account}>
                <div className={styled.label}>??????</div>
                <InputGroup className={styled["enter-input"]}>
                  <Form.Input
                    placeholder="?????????????????????"
                    {...register("email", {
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "????????????????????????????????????",
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
                  <div className={styled.label}>??????</div>
                  <div className={styled.forget} onClick={go.toForgetPassword}>
                    ???????????????????
                  </div>
                </div>
                <InputGroup className={styled["enter-input"]}>
                  <Form.Input
                    placeholder="?????????????????????"
                    {...register("password", {
                      maxLength: 8,
                      // pattern: {
                      //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                      //   message: "???????????????8????????????1????????????1????????????1?????????",
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
                ??????
              </Button>
            </Form>
            {errorMessage && (
              <div className={styled["error-message"]}>
                {errorMessage === "Firebase: Error (auth/user-not-found)."
                  ? "??????????????????"
                  : errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
