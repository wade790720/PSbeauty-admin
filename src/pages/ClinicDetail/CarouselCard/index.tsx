import { useState } from "react"
import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Modal from "components/Modal"

import { FileType } from "types"
import { Uploader } from "rsuite"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"
import CarouselTable from "components/CarouselTable"
import { ImagesFragment } from "../ClinicDetail.graphql.generated"

type CarouselCardProps = {
  data: ImagesFragment["images"]
}

const CarouselCard = ({ data }: CarouselCardProps) => {
  const [openCarousel, setOpenCarousel] = useState(false)
  const [carouselList, setCarouselList] = useState<FileType[]>([])

  return (
    <Card>
      <Card.Header title="輪播">
        <Button variant="secondary" onClick={() => setOpenCarousel(true)}>
          新增
        </Button>
        <Modal
          title="新增輪播圖"
          open={openCarousel}
          confirmText="新增"
          cancelText="取消"
          onConfirm={() => {
            console.log("onConfirm")
          }}
          onClose={() => setOpenCarousel(false)}>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label>預覽圖 (700 x 800px)</Form.Label>
              <Uploader
                listType="picture"
                action=""
                disabled={carouselList.length > 0}
                onChange={(fileList: FileType[]) => {
                  setCarouselList(fileList)
                }}>
                <button>
                  <CameraRetro />
                </button>
              </Uploader>
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>標題</Form.Label>
              <Form.Input type="text" />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>超連結</Form.Label>
              <Form.Input type="text" />
            </Form.Group>
          </Form>
        </Modal>
      </Card.Header>
      <Card.Body>
        <CarouselTable />
      </Card.Body>
    </Card>
  )
}

export default CarouselCard
