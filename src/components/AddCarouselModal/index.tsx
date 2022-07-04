import { useMemo, useState, useEffect } from "react"
import Form from "components/Form"
import { InputPicker, Uploader } from "rsuite"
import { FileType } from "rsuite/Uploader"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"
import Modal from "components/Modal"
import { useGetAllClinicsQuery } from "pages/Clinic/Clinic.graphql.generated"
import { useGetClinicByIdLazyQuery } from "./AddCarouselModal.graphql.generated"
import { useForm, Controller } from "react-hook-form"

type AdvancedOption = "none" | "doctor" | "case"
type Inputs = {
  title: string
  clinic: string
  advancedOption: AdvancedOption
  doctor?: string
  case?: string
}

type AddCarouselModalProps = {
  open: boolean
  onClose: () => void
  onSubmit?: () => void
}

const AddCarouselModal = (props: AddCarouselModalProps) => {
  const [carouselList, setCarouselList] = useState<FileType[]>([])
  const { register, control, watch, getValues, formState, handleSubmit } = useForm<Inputs>({
    mode: "onTouched",
    defaultValues: {
      title: "",
      clinic: "",
      advancedOption: "none",
    },
  })
  const watchClinic = watch("clinic")
  const watchAdvancedOption = watch("advancedOption")

  const getAllClinicsQuery = useGetAllClinicsQuery()
  const allClinics = useMemo(() => {
    return (
      getAllClinicsQuery.data?.allClinics?.map(clinic => ({
        label: clinic?.name || "",
        value: clinic?.id || "",
      })) || []
    )
  }, [getAllClinicsQuery.data])

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
    props.onSubmit && props.onSubmit()
  }

  return (
    <Modal
      title="新增輪播圖"
      open={props.open}
      confirmText="新增"
      cancelText="取消"
      onConfirm={handleSubmit(onSubmit)}
      onClose={props.onClose}>
      <Form>
        <Form.Group layout="vertical">
          <Form.Label>預覽圖 (350 x 135px)</Form.Label>
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
                  <InputPicker data={selectedClinic.doctors} onChange={value => onChange(value)} />
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
    </Modal>
  )
}

export default AddCarouselModal
