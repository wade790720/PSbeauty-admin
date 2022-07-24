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
  sortList?: number[]
  onClose: () => void
  onSubmit?: (output: Carousel) => void
}

export type Clinic = {
  label: string
  value: string
}

type AdvancedOption = "clinic" | "doctor" | "case"

export type Carousel = {
  id?: string
  title: string
  clinicId: string
  sort: number
  advancedOption: AdvancedOption
  doctor?: string
  targetId?: string
  image?: string
  status: boolean
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

  const { register, control, reset, watch, formState, getValues, setValue, handleSubmit } =
    useForm<Carousel>({
      mode: "onTouched",
      defaultValues: props.defaultCarousel || {
        title: "",
        clinicId: "",
        sort: 1,
        advancedOption: "clinic",
        status: true,
      },
    })
  const watchClinic = watch("clinicId")
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
    loadClinicByIdQuery({ variables: { id: watchClinic } })
  }, [loadClinicByIdQuery, watchClinic])

  useEffect(() => {
    if (props.defaultCarousel !== getValues()) reset(props.defaultCarousel)
  }, [props.defaultCarousel])

  const onSubmit = () => {
    console.log("onSubmit", getValues())
    console.log(watch().targetId)
    // props.onSubmit && props.onSubmit(getValues())
  }

  return (
    <Modal open={props.open} closeOnDocumentClick={false} onClose={props.onClose}>
      <Modal.Header>
        <Modal.Title>{props.type === "add" ? "新增輪播圖" : "編輯輪播圖"}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflow: "auto", maxHeight: "600px" }}>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label>預覽圖 (350 x 135px)</Form.Label>
            {props.type === "add" ? (
              <ImageUploader
                onChange={urlList => {
                  setValue("image", urlList[0])
                }}
              />
            ) : (
              props?.defaultCarousel?.image && (
                <img
                  src={props?.defaultCarousel?.image}
                  alt="preview"
                  style={{ width: "350px", border: "1px solid #e4e6ef" }}
                />
              )
            )}
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>標題</Form.Label>
            <Form.Input
              placeholder="請輸入輪播標題"
              {...register("title", {
                required: "此欄位為必填",
                validate: value => value.length !== 0 || "輸入框內不能為空值",
              })}
            />
            {formState.errors?.title?.message && (
              <Form.ErrorMessage>{formState.errors?.title?.message}</Form.ErrorMessage>
            )}
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>順序</Form.Label>
            <Form.Input
              type="number"
              placeholder="請輸入順序"
              {...register("sort", {
                required: "此欄位為必填",
                valueAsNumber: true,
                // validate: value => {
                //   return props.sortList?.every(sort => sort !== value) || "順序值不能重覆"
                // },
              })}
            />
            {formState.errors?.sort?.message && (
              <Form.ErrorMessage>{formState.errors?.sort?.message}</Form.ErrorMessage>
            )}
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>診所</Form.Label>
            {
              <Controller
                name="clinicId"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <InputPicker
                    data={allClinics}
                    defaultValue={value}
                    onChange={value => {
                      console.log("clinicId onChange", value)
                      onChange(value)
                    }}
                  />
                )}
              />
            }
          </Form.Group>
          {watchClinic && (
            <Form.Group layout="vertical">
              <Form.Label>進階篩選</Form.Label>
              <Form.Radio {...register("advancedOption")} value="clinic">
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
          {watchAdvancedOption === "case" && (
            <Form.Group>
              <Form.Label>診所案例</Form.Label>
              {
                <Controller
                  control={control}
                  name="targetId"
                  render={({ field: { value, onChange } }) => (
                    <InputPicker
                      data={selectedClinic.cases}
                      defaultValue={value}
                      onChange={onChange}
                    />
                  )}
                />
              }
            </Form.Group>
          )}
          <Form.Group layout="vertical">
            <Form.Label>狀態</Form.Label>
            {
              <Controller
                name="status"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Toggle defaultChecked={value} onChange={onChange} />
                )}
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
