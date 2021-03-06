import { useMemo, useState } from "react"
import { useGo } from "components/Router"
import { Table, Pagination } from "rsuite"
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
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
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

  const handleChangeLimit = (dataKey: number) => {
    setPage(1)
    setLimit(dataKey)
  }

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
    const ask = confirm("???????????????????")
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
        <Card.Header title="??????">
          <Button variant="secondary" onClick={() => setOpen(true)}>
            ????????????
          </Button>
        </Card.Header>
        <Card.Body>
          <Table height={400} data={clinics}>
            <Column width={70} align="center" fixed>
              <HeaderCell>??????</HeaderCell>
              <Cell dataKey="index" />
            </Column>

            <Column width={160} fixed>
              <HeaderCell>????????????</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={300} flexGrow={1}>
              <HeaderCell>????????????</HeaderCell>
              <Cell dataKey="address" />
            </Column>

            <Column width={100} align="center" fixed>
              <HeaderCell>?????????</HeaderCell>
              <Cell dataKey="caseCount" />
            </Column>

            <Column width={100} align="center" fixed>
              <HeaderCell>?????????</HeaderCell>
              <Cell dataKey="consultReplyCount" />
            </Column>

            <Column width={120} fixed="right">
              <HeaderCell>??????</HeaderCell>
              <Cell>
                {rowData => {
                  return (
                    <span>
                      <LinkButton onClick={() => go.toCosmeticClinicDetail({ id: rowData.id })}>
                        ??????
                      </LinkButton>{" "}
                      | <LinkButton onClick={() => handleDelete(rowData.id)}> ?????? </LinkButton>
                    </span>
                  )
                }}
              </Cell>
            </Column>
          </Table>
          <Pagination
            className="p-5"
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={["-", "limit", "|", "pager", "skip"]}
            total={clinics.length}
            limitOptions={[10, 20]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </Card.Body>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <Modal.Title>????????????</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto", height: "500px" }}>
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
                <Form.Label required>?????????</Form.Label>
                <CosmeticMultiCascader name="categories" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>????????????</Form.Label>
                <Form.Input type="email" {...methods.register("email")} />
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
            </Form>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            ??????
          </Button>
          <Button
            onClick={() => {
              methods.handleSubmit(handleCreate)()
              setOpen(false)
            }}>
            ??????
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ClinicCard
