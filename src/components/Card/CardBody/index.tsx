import QueryStatus, { QueryStatusProps } from "components/QueryStatus"
import cx from "classnames"
import styled from "./CardBody.module.scss"

const CardBody = (props: QueryStatusProps) => {
  return (
    <div
      className={cx("card-body-wrapper", styled.wrapper, props.className, {
        [styled["query-status"]]: props.loading || props.error || props.noData,
      })}
      style={props.style}>
      <QueryStatus {...props} />
    </div>
  )
}

export default CardBody
