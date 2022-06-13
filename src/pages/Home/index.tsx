import { useState } from "react"
import Card from "components/Card"
import Layout from "components/Layout"
import Form from "components/Form"
import Button from "components/Button"
import CarouselTable from "components/CarouselTable"
import { Uploader } from "rsuite"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"
import Modal from "components/Modal"
import { FileType } from "types"
import AdListCard from "./AdListCard"
import { SortEnumType } from "types/schema"
import QueryStatus from "components/QueryStatus"

import { useGetHomeQuery } from "./Home.graphql.generated"

const Home = () => {
  const [carouselList, setCarouselList] = useState<FileType[]>([])
  const [openCarousel, setOpenCarousel] = useState(false)

  const { data, loading, error } = useGetHomeQuery({
    variables: {
      adCardsFirst: 5,
      adCardsOrderId: SortEnumType.Desc,
      adImagesFirst: 5,
      adImagesOrderId: SortEnumType.Desc,
      adImagesWhere: "首頁輪播",
    },
  })

  if (loading) return <QueryStatus.Loading />
  if (error) return <QueryStatus.Error />

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>首頁</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      {data && <AdListCard data={data?.adCards} />}
      <Card>
        <Card.Header title="輪播">
          <Button variant="secondary" onClick={() => setOpenCarousel(true)}>
            新增
          </Button>
        </Card.Header>
        <Card.Body>
          <CarouselTable />
        </Card.Body>
      </Card>

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
              fileList={carouselList}
              autoUpload={false}
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
    </>
  )
}

export default Home
