import { Suspense, lazy } from "react"
import { Container, Row } from "react-grid-system"
import { HashRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom"
import SideBar from "components/SideBar"
import QueryStatus from "components/QueryStatus"
import { useAuth, refresh } from "hooks/useAuth"

import "./App.css"
import "rsuite/dist/rsuite.min.css"
import "react-toastify/dist/ReactToastify.css"
import styled from "./App.module.scss"
import { ToastContainer } from "react-toastify"

const BasicLayout = () => (
  <Container fluid className={styled["container-basic"]}>
    <Row direction="column" style={{ flex: 1 }}>
      <Outlet />
    </Row>
  </Container>
)

const CmsLayout = () => (
  <Container fluid className={styled["container-cms"]}>
    <Row direction="column" style={{ flex: 1 }}>
      <SideBar />
      <main style={{ background: " #f0f5ff" }}>
        <Outlet />
      </main>
    </Row>
  </Container>
)

let internal: ReturnType<typeof setInterval>

function App() {
  const auth = useAuth()
  const NotFound = lazy(() => import("pages/NotFound"))
  const Login = lazy(() => import("pages/Login"))
  const Register = lazy(() => import("pages/Register"))
  const ForgetPassword = lazy(() => import("pages/ForgetPassword"))
  const Home = lazy(() => import("pages/Home"))
  const Clinic = lazy(() => import("pages/Clinic"))
  const ClinicDetail = lazy(() => import("pages/ClinicDetail"))
  const SystemSettings = lazy(() => import("pages/SystemSettings"))

  refresh(auth)
  clearInterval(internal)
  internal = setInterval(() => {
    refresh(auth)
  }, 10 * 60 * 1000) // every 10 minutes check again

  return (
    <>
      <Router>
        <Suspense fallback={<QueryStatus.Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="login" element={<BasicLayout />}>
              <Route index element={<Login />} />
            </Route>
            <Route path="register" element={<BasicLayout />}>
              <Route index element={<Register />} />
            </Route>
            <Route path="forget-password" element={<BasicLayout />}>
              <Route index element={<ForgetPassword />} />
            </Route>
            <Route path="cms" element={<CmsLayout />}>
              <Route index element={<Navigate to="/cms/home" />} />
              <Route path="home" element={<Home />} />
              <Route path="cosmetic-clinic" element={<Clinic />} />
              <Route path="cosmetic-clinic/:id" element={<ClinicDetail />} />
              <Route path="system-settings" element={<SystemSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
