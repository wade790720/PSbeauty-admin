import Button from "components/Button"
import Card from "components/Card"
import CarouselPreview from "components/CarouselPreview"
import ClinicTable from "./ClinicTable"

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
    </>
  )
}

export default CosmeticClinic