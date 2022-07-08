import { useGetAllClinicsQuery, useGetClinicByIdLazyQuery } from "./CarouselModal.graphql.generated"
import { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import Modal from "components/Modal"
import Form from "components/Form"
import ImageUploader from "components/ImageUploader"
import { InputPicker, Toggle } from "rsuite"
import Button from "components/Button"

export type CarouselModalProps = {
  defaultCarousel?: Carousel
  type: "add" | "edit"
  open: boolean
  onClose: () => void
  onSubmit?: (output: Carousel) => void
}

export type Clinic = {
  label: string
  value: string
}

type AdvancedOption = "clinic" | "doctor" | "case"
export type Carousel = {
  title: string
  clinic: string
  sort: string
  advancedOption: AdvancedOption
  doctor?: string
  case?: string
  image?: string
  show: boolean
}

const CarouselModal = (props: CarouselModalProps) => {
  const { data } = useGetAllClinicsQuery()
  const allClinics = useMemo<Clinic[]>(() => {
    return (
      data?.allClinics?.map(clinic => ({
        label: clinic?.name || "",
        value: clinic?.id || "",
      })) || []
    )
  }, [data])

  const { register, control, watch, getValues, setValue, handleSubmit } = useForm<Carousel>({
    mode: "onTouched",
    defaultValues: props.defaultCarousel || {
      title: "",
      clinic: "",
      sort: "",
      advancedOption: "clinic",
      show: true,
    },
  })
  const watchClinic = watch("clinic")
  const watchAdvancedOption = watch("advancedOption")

  const [loadClinicByIdQuery, getClinicByIdQuery] = useGetClinicByIdLazyQuery()
  const selectedClinic = useMemo(() => {
    return {
      doctors:
        getClinicByIdQuery.data?.clinic?.doctors?.map(item => ({
          value: item?.id || "",
          label: item?.name || "",
        })) || [],
      cases:
        getClinicByIdQuery.data?.clinic?.cases?.map(item => ({
          value: item?.id || "",
          label: item?.title || "",
        })) || [],
    }
  }, [getClinicByIdQuery.data])

  useEffect(() => {
    if (!watchClinic) return
    loadClinicByIdQuery({
      variables: { id: watchClinic },
    })
  }, [loadClinicByIdQuery, watchClinic])

  const onSubmit = () => {
    console.log("onConfirm", getValues())
    props.onSubmit && props.onSubmit(getValues())
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Modal.Header>
        <Modal.Title>{props.type === "add" ? "新增輪播圖" : "編輯"}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflow: "auto", maxHeight: "600px" }}>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label>預覽圖 (350 x 135px)</Form.Label>
            {props.type === "add" ? (
              <ImageUploader
                onChange={url => {
                  setValue("image", url)
                }}
              />
            ) : (
              props?.defaultCarousel?.image && (
                <img
                  src={props?.defaultCarousel?.image}
                  alt="preview"
                  style={{ width: "350px", height: "135px", border: "1px solid #e4e6ef" }}
                />
              )
            )}
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>標題</Form.Label>
            <Form.Input placeholder="請輸入輪播標題" {...register("title")} />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>順序</Form.Label>
            <Form.Input placeholder="請輸入順序" {...register("sort")} />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>診所</Form.Label>
            {
              <Controller
                render={({ field: { onChange } }) => (
                  <InputPicker data={allClinics} onChange={value => onChange(value)} />
                )}
                name="clinic"
                control={control}
              />
            }
          </Form.Group>
          {watchClinic && (
            <Form.Group layout="vertical">
              <Form.Label>進階篩選</Form.Label>
              <Form.Radio {...register("advancedOption")} value="none">
                無
              </Form.Radio>
              <Form.Radio {...register("advancedOption")} value="doctor">
                醫生
              </Form.Radio>
              <Form.Radio {...register("advancedOption")} value="case">
                案例
              </Form.Radio>
            </Form.Group>
          )}
          {watchAdvancedOption === "doctor" && (
            <Form.Group>
              <Form.Label>診所醫生</Form.Label>
              {
                <Controller
                  render={({ field: { onChange } }) => (
                    <InputPicker
                      data={selectedClinic.doctors}
                      onChange={value => onChange(value)}
                    />
                  )}
                  name="doctor"
                  control={control}
                />
              }
            </Form.Group>
          )}
          {watchAdvancedOption === "case" && (
            <Form.Group>
              <Form.Label>診所案例</Form.Label>
              {
                <Controller
                  render={({ field: { onChange } }) => (
                    <InputPicker data={selectedClinic.cases} onChange={value => onChange(value)} />
                  )}
                  name="case"
                  control={control}
                />
              }
            </Form.Group>
          )}
          <Form.Group layout="vertical">
            <Form.Label>狀態</Form.Label>
            {
              <Controller
                render={({ field: { value, onChange } }) => (
                  <Toggle defaultChecked={value} onChange={onChange} />
                )}
                name="show"
                control={control}
              />
            }
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onClose()}>
          取消
        </Button>
        <Button
          onClick={() => {
            handleSubmit(onSubmit)()
            props.onClose()
          }}>
          {props.type === "add" ? "新增" : "儲存"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CarouselModal
