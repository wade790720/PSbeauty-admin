import Card from "components/Card"
import CarouselPreview from "components/CarouselPreview"

const CosmeticClinic = () => {
  return (
    <>
      <div>CosmeticClinic</div>
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

export default CosmeticClinic