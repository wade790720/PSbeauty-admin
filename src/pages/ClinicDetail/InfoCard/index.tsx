import { useMemo } from "react"
import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Editor from "components/Editor"
import CosmeticMultiCascader from "components/CosmeticMultiCascader"
import { GetClinicDetailQuery, useUpdateClinicMutation } from "../ClinicDetail.graphql.generated"
import { useForm, FormProvider } from "react-hook-form"
import { toast } from "react-toastify"

type InfoCardProps = {
  data: GetClinicDetailQuery["clinic"]
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

  const methods = useForm<Inputs>({
    mode: "onTouched",
    defaultValues: {
      name: clinic.name,
      county: clinic.county,
      town: clinic.town,
      address: clinic.address,
      web: clinic.web,
      phone: clinic.phone,
      description: clinic.description,
      categories: clinic.categories,
    },
  })

  const [updateClinicMutation] = useUpdateClinicMutation({ refetchQueries: ["GetClinicDetail"] })

  const handleSave = async () => {
    const { name, county, town, address, web, phone, description, categories } = methods.getValues()
    const response = await updateClinicMutation({
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

    if (response.data) {
      toast.success("儲存成功！", {
        theme: "colored",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast.error(`儲存失敗：${response.errors}`, {
        theme: "colored",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleClear = () => {
    methods.reset({
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
        <FormProvider {...methods}>
          <Form>
            <Form.Group layout="vertical">
              <Form.Label required>診所名稱</Form.Label>
              <Form.Input
                type="text"
                {...methods.register("name", {
                  required: "此欄位為必填",
                  validate: value => value.length !== 0 || "輸入框內不能為空值",
                })}
              />
              {methods.formState.errors?.name?.message && (
                <Form.ErrorMessage>{methods.formState.errors?.name?.message}</Form.ErrorMessage>
              )}
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>大小分類</Form.Label>
              <CosmeticMultiCascader name="categories" />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>完整地址</Form.Label>
              <div className="inline-flex w-full">
                <Form.Input
                  type="text"
                  placeholder="縣市"
                  className="mr-4"
                  style={{ flex: "1 1 300px" }}
                  {...methods.register("county")}
                />
                <Form.Input
                  type="text"
                  placeholder="地區"
                  className="mr-4"
                  style={{ flex: "1 1 300px" }}
                  {...methods.register("town")}
                />
                <Form.Input type="text" placeholder="地址" {...methods.register("address")} />
              </div>
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>診所網址</Form.Label>
              <Form.Input type="url" {...methods.register("web")} />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>診所電話</Form.Label>
              <Form.Input type="tel" {...methods.register("phone")} />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>診所介紹</Form.Label>
              <Editor name="description" />
            </Form.Group>
            <div className="flex justify-end">
              <Button style={{ marginRight: "10px" }} onClick={methods.handleSubmit(handleSave)}>
                儲存
              </Button>
              <Button variant="secondary" onClick={handleClear}>
                清除
              </Button>
            </div>
          </Form>
        </FormProvider>
      </Card.Body>
    </Card>
  )
}

export default InfoCard
