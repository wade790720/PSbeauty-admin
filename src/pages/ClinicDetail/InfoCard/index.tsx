import { useMemo } from "react"
import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Editor from "components/Editor"
import CosmeticMultiCascader from "components/CosmeticMultiCascader"
import { GetClinicQuery, useUpdateClinicMutation } from "../ClinicDetail.graphql.generated"
import { useForm } from "react-hook-form"

type InfoCardProps = {
  data: GetClinicQuery["clinic"]
}

type Inputs = {
  name: string
  county: string
  town: string
  address: string
  web: string
  phone: string
  description: string
  categories: string[]
}

const InfoCard = ({ data }: InfoCardProps) => {
  const { register, getValues, setValue, formState, handleSubmit, reset } = useForm<Inputs>({
    mode: "onTouched",
  })
  const clinic = useMemo(() => {
    return {
      id: data?.id || "",
      name: data?.name || "",
      county: data?.county || "",
      town: data?.town || "",
      address: data?.address || "",
      web: data?.web || "",
      phone: data?.phone || "",
      description: data?.description || "",
      categories: data?.categories?.map(category => category?.id || ""),
    }
  }, [data])

  const [updateClinicMutation] = useUpdateClinicMutation({ refetchQueries: ["GetClinic"] })

  const handleSave = () => {
    const { name, county, town, address, web, phone, description, categories } = getValues()
    updateClinicMutation({
      variables: {
        id: data?.id || "",
        name,
        phone,
        county,
        town,
        address,
        web,
        description: description || clinic.description,
        categories: categories || clinic.categories,
      },
    })
  }

  const handleClear = () => {
    reset({
      name: "",
      county: "",
      town: "",
      address: "",
      web: "",
      phone: "",
      description: "",
      categories: [],
    })
  }

  return (
    <Card>
      <Card.Header title={clinic.name} />
      <Card.Body>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label required>診所名稱</Form.Label>
            <Form.Input
              type="text"
              value={clinic.name}
              {...register("name", {
                required: "此欄位為必填",
                validate: value => value.length !== 0 || "輸入框內不能為空值",
              })}
            />
            {formState.errors?.name?.message && (
              <Form.ErrorMessage>{formState.errors?.name?.message}</Form.ErrorMessage>
            )}
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>大小分類</Form.Label>
            <CosmeticMultiCascader
              defaultValue={clinic.categories}
              onChange={value => {
                setValue(
                  "categories",
                  value.map(item => item + ""),
                )
              }}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>完整地址</Form.Label>
            <div className="inline-flex w-full">
              <Form.Input
                type="text"
                placeholder="縣市"
                className="mr-4"
                style={{ flex: "1 1 300px" }}
                value={clinic.county}
                {...register("county")}
              />
              <Form.Input
                type="text"
                placeholder="地區"
                className="mr-4"
                style={{ flex: "1 1 300px" }}
                value={clinic.town}
                {...register("town")}
              />
              <Form.Input
                type="text"
                placeholder="地址"
                value={clinic.address}
                {...register("address")}
              />
            </div>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>診所網址</Form.Label>
            <Form.Input type="url" value={clinic.web} {...register("web")} />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>診所電話</Form.Label>
            <Form.Input type="tel" value={clinic.phone} {...register("phone")} />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>診所介紹</Form.Label>
            <Editor
              // initialValue={clinic.description}
              onEdit={newValue => {
                setValue("description", newValue)
              }}
            />
          </Form.Group>
          <div className="flex justify-end">
            <Button style={{ marginRight: "10px" }} onClick={handleSubmit(handleSave)}>
              儲存
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              清除
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default InfoCard
