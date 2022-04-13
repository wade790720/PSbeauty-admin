import CardBase from "./Card"
import CardHeader from "./CardHeader"
import CardBody from "./CardBody"

const Card = Object.assign(CardBase, {
  Header: CardHeader,
  Body: CardBody,
})

export default Card
