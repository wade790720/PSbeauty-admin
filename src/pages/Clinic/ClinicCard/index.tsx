import { useMemo, useState } from "react"
import { useGo } from "components/Router"
import { Table } from "rsuite"
import Button, { LinkButton } from "components/Button"
import {
  GetClinicQuery,
  useAddClinicMutation,
  useDeleteClinicMutation,
} from "../Clinic.graphql.generated"
import Card from "components/Card"
import Modal from "components/Modal"
import Form from "components/Form"
import Editor from "components/Editor"
import CosmeticMultiCascader from "components/CosmeticMultiCascader"
import { useForm, FormProvider } from "react-hook-form"

type ClinicCardProps = {
  data: GetClinicQuery["clinics"]
}

type Inputs = {
  name: string
  email: string
  county: string
  town: string
  address: string
  phone: string
  web: string
  description: string
  categories: string[]
}

const ClinicCard = ({ data }: ClinicCardProps) => {
  const { Column, HeaderCell, Cell } = Table
  const go = useGo()
  const [open, setOpen] = useState(false)

  const clinics = useMemo(() => {
    if (!data?.edges) return []

    return data?.edges?.map((clinic, index) => {
      const county = clinic.node?.county || ""
      const town = clinic.node?.town || ""
      const address = clinic.node?.address || ""

      return {
        index: index + 1,
        id: clinic.node?.id || "",
        name: clinic.node?.name || "",
        address: county + town + address,
        caseCount: clinic.node?.caseCount || 0,
        consultReplyCount: clinic.node?.consultReplyCount || 0,
      }
    })
  }, [data])

  const methods = useForm<Inputs>({ mode: "onTouched" })
  const [addClinicMutation] = useAddClinicMutation({ refetchQueries: ["GetClinic"] })
  const [deleteClinicMutation] = useDeleteClinicMutation({ refetchQueries: ["GetClinic"] })

  const handleCreate = () => {
    const { name, county, town, address, web, phone, description, categories } = methods.getValues()
    addClinicMutation({
      variables: {
        name,
        categories,
        county,
        town,
        address,
        description,
        phone,
        web,
      },
    })
  }

  const handleDelete = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteClinicMutation({
        variables: {
          id,
        },
      })
  }

  return (
    <>
      <Card>
        <Card.Header title="診所">
          <Button variant="secondary" onClick={() => setOpen(true)}>
            新增診所
          </Button>
        </Card.Header>
        <Card.Body>
          <Table height={400} data={clinics}>
            <Column width={70} align="center" fixed>
              <HeaderCell>序號</HeaderCell>
              <Cell dataKey="index" />
            </Column>

            <Column width={160} fixed minWidth={200}>
              <HeaderCell>診所名稱</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={300} flexGrow={1}>
              <HeaderCell>診所地址</HeaderCell>
              <Cell dataKey="address" />
            </Column>

            <Column width={100} align="center" fixed>
              <HeaderCell>案例數</HeaderCell>
              <Cell dataKey="caseCount" />
            </Column>

            <Column width={100} align="center" fixed>
              <HeaderCell>回覆數</HeaderCell>
              <Cell dataKey="consultReplyCount" />
            </Column>

            <Column width={120} fixed="right">
              <HeaderCell>動作</HeaderCell>
              <Cell>
                {rowData => {
                  return (
                    <span>
                      <LinkButton onClick={() => go.toCosmeticClinicDetail({ id: rowData.id })}>
                        編輯
                      </LinkButton>{" "}
                      | <LinkButton onClick={() => handleDelete(rowData.id)}> 刪除 </LinkButton>
                    </span>
                  )
                }}
              </Cell>
            </Column>
          </Table>
        </Card.Body>
      </Card>
      <Modal open={open} backdrop={false} onClose={() => setOpen(false)}>
        <Modal.Header>
          <Modal.Title>新增診所</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto", height: "500px" }}>
          <FormProvider {...methods}>
            <Form>
              <Form.Group layout="vertical">
                <Form.Label required>新增診所</Form.Label>
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
                <Form.Label required>大分類</Form.Label>
                <CosmeticMultiCascader name="categories" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>電子信箱</Form.Label>
                <Form.Input type="email" {...methods.register("email")} />
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
            </Form>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button
            onClick={() => {
              methods.handleSubmit(handleCreate)()
              setOpen(false)
            }}>
            新增
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ClinicCard
