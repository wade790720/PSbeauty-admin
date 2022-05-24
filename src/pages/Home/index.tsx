import Card from "components/Card"
import Layout from "components/Layout"
import CarouselPreview from "components/CarouselPreview"
import Form from "components/Form"
import Button from "components/Button"
import NoticeTable from "./NoticeTable"
import AdvertisementTable from "./AdvertisementTable"

// TODO: need to remove.
import React, { useEffect } from "react"
import { useGetUserIdLazyQuery } from "./Testing.graphql.generated"
import { Vendor } from "types/schema"


const Home = () => {
  // TODO: need to remove.
  const [loadQuery, query] = useGetUserIdLazyQuery()
  const userList = query?.data?.userList || []
  console.log(userList)

  useEffect(() => {
    loadQuery({
      variables: {
        account: "abc",
        vendor: Vendor.Dmo,
      },
    })
  }, [])

  return (
    <>
      {/* <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>首頁</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <Card>
        <Card.Header title="公告" />
        <Card.Body>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label required>標題</Form.Label>
              <Form.Input type="text" />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>內容</Form.Label>
              <Form.Textarea style={{ height: "100px" }} />
            </Form.Group>
            <Button style={{ marginRight: "10px" }}>發送</Button>
            <Button variant="secondary">清空</Button>
          </Form>
          <NoticeTable />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="輪播" />
        <Card.Body>
          <CarouselPreview />
        </Card.Body>
      </Card> */}
      <Card>
        <Card.Header title="廣告卡列表" />
        <Card.Body>
          <AdvertisementTable />
        </Card.Body>
      </Card>
    </>
  )
}

export default Home