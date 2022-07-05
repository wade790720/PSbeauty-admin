import { useMemo, useEffect } from "react"
import Form from "components/Form"
import { InputPicker } from "rsuite"
import Modal from "components/Modal"
import Button from "components/Button"
import {
  useGetClinicByIdLazyQuery,
  useGetAllClinicsQuery,
} from "./AddCarouselModal.graphql.generated"
import { useForm, Controller } from "react-hook-form"
import ImageUploader from "components/ImageUploader"

type AdvancedOption = "none" | "doctor" | "case"
export type Carousel = {
  title: string
  clinic: string
  advancedOption: AdvancedOption
  doctor?: string
  case?: string
  image?: string
}

type AddCarouselModalProps = {
  open: boolean
  onClose: () => void
  onSubmit?: (output: Carousel) => void
}

const AddCarouselModal = (props: AddCarouselModalProps) => {
  const { register, control, watch, getValues, setValue, formState, handleSubmit } =
    useForm<Carousel>({
      mode: "onTouched",
      defaultValues: {
        title: "",
        clinic: "",
        advancedOption: "none",
      },
    })
  const watchClinic = watch("clinic")
  const watchAdvancedOption = watch("advancedOption")

  const { data } = useGetAllClinicsQuery()
  const allClinics = useMemo(() => {
    return (
      data?.allClinics?.map(clinic => ({
        label: clinic?.name || "",
        value: clinic?.id || "",
      })) || []
    )
  }, [data])

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
        <Modal.Title>新增輪播圖</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label>預覽圖 (350 x 135px)</Form.Label>
            <ImageUploader
              onChange={url => {
                setValue("image", url)
              }}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>標題</Form.Label>
            <Form.Input placeholder="請輸入輪播標題" {...register("title")} />
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onClose()}>
          取消
        </Button>
        <Button
          onClick={() => {
            handleSubmit(onSubmit)
            props.onClose()
          }}>
          新增
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddCarouselModal
