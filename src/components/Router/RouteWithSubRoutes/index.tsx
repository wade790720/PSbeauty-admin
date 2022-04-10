import { Route } from "react-router-dom"

export type RoutesProps = {
  routes: RouteConfig[]
}

export type RouteConfig = {
  path: string
  // ts 沒有辦法得知進來的元件，其帶的參數是什麼型態，參考 react route 的 ts 設定也是使用 any
  // eslint-disable-next-line
  component: React.LazyExoticComponent<any>
  breadcrumb?: string
  exact?: boolean
  // eslint-disable-next-line
  query?: any
} & Partial<RoutesProps>

const RouteWithSubRoutes = (props: RouteConfig) => {
  return (
    <Route
      path={props.path}
      element={<props.component routes={props.routes || []} query={props.query} />}
    />
  )
}

export default RouteWithSubRoutes
