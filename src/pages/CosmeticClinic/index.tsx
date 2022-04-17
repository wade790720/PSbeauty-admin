import Button from "components/Button"
import Card from "components/Card"
import CarouselPreview from "components/CarouselPreview"
import { ReactComponent as EllipsisVertical } from "./EllipsisVertical.svg"
import Form from "components/Form"
import Info from "./Info"
import ClinicTable from "./ClinicTable"
import MedicalTeamTable from "./MedicalTeamTable"
import CaseTable from "./CaseTable"

const CosmeticClinic = () => {
  return (
    <>
      <Card>
        <Card.Header title="輪播" />
        <Card.Body>
          <CarouselPreview />
          {/* <FileUploader name="test" putEP="test"/> */}
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="診所" >
          <Button variant="secondary">新增診所</Button>
        </Card.Header>
        <Card.Body>
          <ClinicTable />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="星采醫學美容診所" />
        <Card.Body>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label required>診所名稱</Form.Label>
              <Form.Input type="text" />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>大小分類</Form.Label>
              <Form.Checkbox>小分類1</Form.Checkbox>
              <Form.Checkbox>小分類2</Form.Checkbox>
              <Form.Checkbox>小分類3</Form.Checkbox>
              <Form.Checkbox>小分類4</Form.Checkbox>
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>診所介紹</Form.Label>
              <Form.Textarea style={{ height: "100px" }} />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>完整地址</Form.Label>
              <Form.Input type="text" />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>診所網址</Form.Label>
              <Form.Input type="text" />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>診所電話</Form.Label>
              <Form.Input type="text" />
            </Form.Group>
            <Button style={{ marginRight: "10px" }}>儲存修改</Button>
            <Button variant="secondary">取消</Button>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="醫療團隊" >
          <Button variant="secondary">新增</Button>
        </Card.Header>
        <Card.Body>
          <MedicalTeamTable />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="案例列表">
          <Button variant="secondary">新增</Button>
        </Card.Header>
        <Card.Body>
          <Info />
          <CaseTable />
        </Card.Body>
      </Card>
    </>
  )
}

export default CosmeticClinic