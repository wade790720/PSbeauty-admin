import styled from "./Login.module.scss"
import { ReactComponent as Logo } from "./images/logo.svg"
import Form, { InputGroup, Append } from "components/Form"
import Button from "components/Button"

export default function Login() {
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
                  <Form.Input placeholder="Enter your email or username" />
                </InputGroup>
              </div>
              <div className={styled.password}>
                <div>
                  <div className={styled.label}>Password</div>
                  <div className={styled["forget-password"]}>Forgot Password?</div>
                </div>
                <InputGroup className={styled["enter-input"]}>
                  <Form.Input placeholder="············" />
                  <Append className={styled.append}>
                    <i className="bx bx-hide" />
                  </Append>
                </InputGroup>
              </div>
              <div className={styled.remember}>
                <input type="checkbox" />
                <div className={styled.label}> Remember Me</div>
              </div>
              <Button className={styled["sign-in"]}>Sign in</Button>
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
