import { Suspense, lazy } from "react"
import { Container, Row } from "react-grid-system"
import { HashRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom"
import SideBar from "components/SideBar"
import QueryStatus from "components/QueryStatus"

import "./App.css"
import "rsuite/dist/rsuite.min.css"
import styled from "./App.module.scss"

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

function App() {
  const NotFound = lazy(() => import("pages/NotFound"))
  const Login = lazy(() => import("pages/Login"))
  const Home = lazy(() => import("pages/Home"))
  const Clinic = lazy(() => import("pages/Clinic"))
  const ClinicDetail = lazy(() => import("pages/ClinicDetail"))
  const SystemSettings = lazy(() => import("pages/SystemSettings"))

  return (
    <>
      <Router>
        <Suspense fallback={<QueryStatus.Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="login" element={<BasicLayout />}>
              <Route index element={<Login />} />
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
    </>
  )
}

export default App
