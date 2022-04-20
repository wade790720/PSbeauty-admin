import Card from "components/Card"
import Layout from "components/Layout"
import CarouselPreview from "components/CarouselPreview"
import Form from "components/Form"
import Button from "components/Button"
import NoticeTable from "./NoticeTable"

const Home = () => {
  return (
    <>
      <Layout.Breadcrumbs>
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
          {/* <FileUploader name="test" putEP="test"/> */}
        </Card.Body>
      </Card>
    </>
  )
}

export default Home