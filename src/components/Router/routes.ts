import { lazy } from "react"
import { RouteConfig } from "./RouteWithSubRoutes"

const Home = lazy(() => import("pages/Home"))
const Clinic = lazy(() => import("pages/Clinic"))
const SystemSettings = lazy(() => import("pages/SystemSettings"))
const NotFound = lazy(() => import("pages/NotFound"))

const routes: RouteConfig[] = [
  {
    path: "/cms",
    component: Home,
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
        component: Clinic,
      },
      /* 系統設定頁 */
      {
        path: "/cms/system-settings",
        component: SystemSettings,
      },
    ],
  },
  /* 404 not found */
  {
    path: "*",
    component: NotFound,
  },
]

export default routes
