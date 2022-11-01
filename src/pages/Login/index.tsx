import styled from "./Login.module.scss"
import Form, { InputGroup, Append } from "components/Form"
import Button from "components/Button"
import { setStorageValue } from "hooks/useLocalStorage"
import { useGo } from "components/Router"
import { useForm } from "react-hook-form"
import logo from "./images/logo.png"
import jwt_decode, { JwtPayload } from "jwt-decode"
import { useSignInWithEmailAndPasswordMutation } from "./Login.graphql.generated"

type Inputs = {
  email: string
  password: string
}

type User = JwtPayload & {
  claims: {
    admin: boolean
    clinic: string
    id: string
    name: string
    phone: string
  }
}

export default function Login() {
  const go = useGo()
  const { register, getValues, formState, handleSubmit } = useForm<Inputs>({ mode: "onTouched" })
  const [signInMutation] = useSignInWithEmailAndPasswordMutation()

  const login = async () => {
    try {
      const userCredential = await signInMutation({
        variables: {
          email: getValues().email,
          password: getValues().password,
        },
      })
      const customToken = userCredential?.data?.signInWithEmailAndPassword?.customToken || ""
      const refreshToken = userCredential?.data?.signInWithEmailAndPassword?.refreshToken || ""
      const user: User = await jwt_decode(customToken)

      if (user?.claims.admin) {
        setStorageValue("email", getValues().email)
        setStorageValue("customToken", customToken)
        setStorageValue("refreshToken", refreshToken)
        go.toHome()
      } else {
        alert("此帳號不是管理者，請洽詢管理者")
      }
    } catch {
      alert("帳號密碼錯誤，請重新輸入")
    }
  }

  return (
    <div className={styled.wrapper}>
      <div className={styled.outer}>
        <div className={styled.card}>
          <div className={styled.inner}>
            <div className={styled.header}>
              <img src={logo} alt="logo" width={100} height={100} />
            </div>
            <div className={styled.hello}>歡迎來到 P/S.MAKER 後臺登入頁</div>
            <div className={styled.tip}>請登錄您的帳戶</div>
            <Form>
              <div className={styled.account}>
                <div className={styled.label}>註冊的郵箱</div>
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
