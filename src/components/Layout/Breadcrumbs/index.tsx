import Breadcrumbs from "components/Breadcrumbs"
import styled from "./Breadcrumbs.module.scss"

export type BreadcrumbsProps = ReactProps.Component

const BreadcrumbsBase = (props: BreadcrumbsProps) => {
  return (
    <header className={styled.wrapper} style={props.style}>
      <Breadcrumbs>{props.children}</Breadcrumbs>
    </header>
  )
}

const BreadcrumbsComponent = Object.assign(BreadcrumbsBase, { Item: Breadcrumbs.Item })

export default BreadcrumbsComponent
