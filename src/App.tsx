import { Suspense } from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Container, Row } from "react-grid-system"
import { RouteWithSubRoutes } from "components/Router"
import styled from "./App.module.scss"
import QueryStatus from "components/QueryStatus"
import { lazy } from "react"
import SideBar from "components/SideBar"

function App() {
  const Cms = lazy(() => import("pages/Cms"))
  const NotFound = lazy(() => import("pages/NotFound"))
  // const Login = lazy(() => import("pages/Login"))
  const Home = lazy(() => import("pages/Home"))
  const CosmeticCase = lazy(() => import("pages/CosmeticCase"))
  const CosmeticClinic = lazy(() => import("pages/CosmeticClinic"))
  const SystemSettings = lazy(() => import("pages/SystemSettings"))

  return (
    <div>
      <Router>
        <Container fluid className={styled.container}>
          <Row direction="column" style={{ flex: 1 }}>
            <Suspense fallback={<QueryStatus.Loading />}>
              <SideBar />
              <main>
                <Routes>
                  <Route path="/" element={<Cms />} />
                  <Route path="/cms" element={<Home />} />
                  <Route path="/cms/cosmetic-clinic" element={<CosmeticClinic />} />
                  <Route path="/cms/cosmetic-case" element={<CosmeticCase />} />
                  <Route path="/cms/system-settings" element={<SystemSettings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </Suspense>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
