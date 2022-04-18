import { Suspense } from "react"
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import { Container, Row } from "react-grid-system"
import styled from "./App.module.scss"
import "boxicons/css/boxicons.min.css"
import QueryStatus from "components/QueryStatus"
import { lazy } from "react"
import SideBar from "components/SideBar"

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
      <main>
        <Outlet />
      </main>
    </Row>
  </Container>
)

function App() {
  const Cms = lazy(() => import("pages/Cms"))
  const NotFound = lazy(() => import("pages/NotFound"))
  const Login = lazy(() => import("pages/Login"))
  const Home = lazy(() => import("pages/Home"))
  const CosmeticCase = lazy(() => import("pages/CosmeticCase"))
  const CosmeticClinic = lazy(() => import("pages/CosmeticClinic"))
  const CosmeticClinicDetail = lazy(() => import("pages/CosmeticClinicDetail"))
  const CosmeticClinicDetailCase = lazy(() => import("pages/CosmeticClinicDetailCase"))
  const SystemSettings = lazy(() => import("pages/SystemSettings"))


  return (
    <div>
      <Router>
        <Suspense fallback={<QueryStatus.Loading />}>
          <Routes>
            <Route path="/" element={<Cms />} />
            <Route path="login" element={<BasicLayout />}>
              <Route index element={<Login />} />  
            </Route>
            <Route path="cms" element={<CmsLayout />}>
              <Route index element={<Home />} />
              <Route path="cosmetic-clinic" element={<CosmeticClinic />} />
              <Route path="cosmetic-clinic/:id" element={<CosmeticClinicDetail />} />
              <Route path="cosmetic-clinic/:id/:caseId" element={<CosmeticClinicDetailCase />} />
              <Route path="cosmetic-case" element={<CosmeticCase />} />
              <Route path="system-settings" element={<SystemSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
