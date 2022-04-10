import { lazy } from "react"
import { RouteConfig } from "./RouteWithSubRoutes"

const Cms = lazy(() => import("pages/Cms"))
const NotFound = lazy(() => import("pages/NotFound"))
// const Login = lazy(() => import("pages/Login"))
const Home = lazy(() => import("pages/Home"))
const CosmeticCase = lazy(() => import("pages/CosmeticCase"))
const CosmeticClinic = lazy(() => import("pages/CosmeticClinic"))
const SystemSettings = lazy(() => import("pages/SystemSettings"))

const routes: RouteConfig[] = [
  {
    path: "/cms",
    component: Cms,
    routes: [
      /* Home */
      {
        path: "/cms",
        component: Home,
        exact: true,
      },
      /* 診所頁 */
      {
        path: "/cms/cosmetic-clinic",
        component: CosmeticClinic,
      },
      /* 病例頁 */
      {
        path: "/cms/cosmetic-case",
        component: CosmeticCase,
      },
      /* 系統設定頁 */
      {
        path: "/cms/system-settings",
        component: SystemSettings,
      },
    ]
  },

  /* 404 not found */
  {
    path: "*",
    component: NotFound,
  },
]

export default routes
