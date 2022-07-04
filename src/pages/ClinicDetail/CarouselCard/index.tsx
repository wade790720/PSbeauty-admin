import { useState } from "react"
import Button from "components/Button"
import Card from "components/Card"
import CarouselTable from "components/CarouselTable"
import { ImagesFragment } from "../ClinicDetail.graphql.generated"
import AddCarouselModal from "components/AddCarouselModal"

type CarouselCardProps = {
  data: ImagesFragment["images"]
}

const CarouselCard = ({ data }: CarouselCardProps) => {
  const [openCarousel, setOpenCarousel] = useState(false)

  return (
    <Card>
      <Card.Header title="輪播">
        <Button variant="secondary" onClick={() => setOpenCarousel(true)}>
          新增
        </Button>
        <AddCarouselModal open={openCarousel} onClose={() => setOpenCarousel(false)} />
      </Card.Header>
      <Card.Body>
        <CarouselTable />
      </Card.Body>
    </Card>
  )
}

export default CarouselCard
