import { CSSTransition, TransitionGroup } from "react-transition-group"
import { Routes, useLocation } from "react-router-dom"
import "./FadeInSwitch.scss"

type FadeInSwitch = {
  /** 和 Route 的 key 對應 */
  eventKey: string
} & ReactProps.Component

export default function FadeInSwitch(props: FadeInSwitch) {
  const location = useLocation()
  return (
    <TransitionGroup style={props.style}>
      <CSSTransition key={props.eventKey} classNames="fade-in-switch" timeout={200} unmountOnExit>
        <Routes location={location}>{props.children}</Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}
