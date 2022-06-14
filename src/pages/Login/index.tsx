import { useState } from "react"
import styled from "./Login.module.scss"
import { ReactComponent as Logo } from "./images/logo.svg"
import Form, { InputGroup, Append } from "components/Form"
import Button from "components/Button"
import { auth } from "firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { setStorageValue } from "hooks/useLocalStorage"
import { useGo } from "components/Router"

export default function Login() {
  const go = useGo()
  const [user, setUser] = useState({ email: "", password: "" })

  const login = async () => {
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password)
    const idToken = await userCredential.user.getIdToken(true)

    console.log(idToken)
    setStorageValue("token", idToken)
    if (idToken) go.toHome()
  }

  return (
    <div className={styled.wrapper}>
      <div className={styled["card-wrapper"]}>
        <div className={styled.card}>
          <div className={styled["card-body"]}>
            <div className={styled.header}>
              <Logo />
              <span>PS beauty</span>
            </div>
            <div className={styled.hello}>Welcome to PS beauty! 👋</div>
            <div className={styled.tip}>Please sign-in to your account and start the adventure</div>
            <Form>
              <div className={styled.account}>
                <div className={styled.label}>Email or Username</div>
                <InputGroup className={styled["enter-input"]}>
                  <Form.Input
                    placeholder="Enter your email or username"
                    onChange={e => setUser({ ...user, email: e.target.value + "" })}
                  />
                </InputGroup>
              </div>
              <div className={styled.password}>
                <div>
                  <div className={styled.label}>Password</div>
                  <div className={styled["forget-password"]}>Forgot Password?</div>
                </div>
                <InputGroup className={styled["enter-input"]}>
                  <Form.Input
                    placeholder="············"
                    onChange={e => setUser({ ...user, password: e.target.value + "" })}
                  />
                  <Append className={styled.append}>
                    <i className="bx bx-hide" />
                  </Append>
                </InputGroup>
              </div>
              <div className={styled.remember}>
                <input type="checkbox" />
                <div className={styled.label}> Remember Me</div>
              </div>
              <Button className={styled["sign-in"]} onClick={login}>
                Sign in
              </Button>
            </Form>
            <div className={styled["create-new-count"]}>
              <span>New on our platform?</span>
              <a>
                <span>Create an account</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
