import { useMemo } from "react"
import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Editor from "components/Editor"
import CosmeticMultiCascader from "components/CosmeticMultiCascader"
import { GetClinicDetailQuery, useUpdateClinicMutation } from "../ClinicDetail.graphql.generated"
import { useForm, FormProvider } from "react-hook-form"

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

  const handleSave = () => {
    const { name, county, town, address, web, phone, description, categories } = methods.getValues()
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
              <Form.Label required>????????????</Form.Label>
              <Form.Input
                type="text"
                {...methods.register("name", {
                  required: "??????????????????",
                  validate: value => value.length !== 0 || "???????????????????????????",
                })}
              />
              {methods.formState.errors?.name?.message && (
                <Form.ErrorMessage>{methods.formState.errors?.name?.message}</Form.ErrorMessage>
              )}
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label required>????????????</Form.Label>
              <CosmeticMultiCascader name="categories" />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>????????????</Form.Label>
              <div className="inline-flex w-full">
                <Form.Input
                  type="text"
                  placeholder="??????"
                  className="mr-4"
                  style={{ flex: "1 1 300px" }}
                  {...methods.register("county")}
                />
                <Form.Input
                  type="text"
                  placeholder="??????"
                  className="mr-4"
                  style={{ flex: "1 1 300px" }}
                  {...methods.register("town")}
                />
                <Form.Input type="text" placeholder="??????" {...methods.register("address")} />
              </div>
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>????????????</Form.Label>
              <Form.Input type="url" {...methods.register("web")} />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>????????????</Form.Label>
              <Form.Input type="tel" {...methods.register("phone")} />
            </Form.Group>
            <Form.Group layout="vertical">
              <Form.Label>????????????</Form.Label>
              <Editor name="description" />
            </Form.Group>
            <div className="flex justify-end">
              <Button style={{ marginRight: "10px" }} onClick={methods.handleSubmit(handleSave)}>
                ??????
              </Button>
              <Button variant="secondary" onClick={handleClear}>
                ??????
              </Button>
            </div>
          </Form>
        </FormProvider>
      </Card.Body>
    </Card>
  )
}

export default InfoCard
