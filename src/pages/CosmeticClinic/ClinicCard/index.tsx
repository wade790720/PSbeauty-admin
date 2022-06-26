import { useState, useMemo } from "react"
import { useGo } from "components/Router"
import { Table, Pagination, MultiCascader } from "rsuite"
import Button, { LinkButton } from "components/Button"
import {
  GetClinicQuery,
  useGetCategoriesQuery,
  useAddClinicMutation,
  useDeleteClinicMutation,
} from "../Clinic.graphql.generated"
import Card from "components/Card"
import Modal from "components/Modal"
import Form from "components/Form"
import Editor from "components/Editor"

type ClinicCardProps = {
  data: GetClinicQuery["clinics"]
}

const ClinicCard = ({ data }: ClinicCardProps) => {
  const { Column, HeaderCell, Cell } = Table
  const go = useGo()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [open, setOpen] = useState(false)
  const categories = useGetCategoriesQuery()

  const [newClinic, setNewClinic] = useState({
    name: "",
    email: "",
    county: "",
    town: "",
    address: "",
    web: "",
    phone: "",
    description: "",
    categories: [""],
  })

  const [clinics, setClinics] = useState(() => {
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
  })

  const [addClinicMutation] = useAddClinicMutation({
    onCompleted: data => {
      setClinics([
        ...clinics,
        {
          index: clinics[clinics.length - 1].index + 1,
          id: data.addClinic?.id || "",
          name: newClinic.name,
          address: newClinic.county + newClinic.town + newClinic.address,
          caseCount: 0,
          consultReplyCount: 0,
        },
      ])
    },
  })

  const [deleteClinicMutation] = useDeleteClinicMutation({
    onCompleted: data => {
      setClinics(clinics.filter(clinic => clinic.id !== data.deleteClinic?.id))
    },
  })

  const options = useMemo(() => {
    if (!categories.data) return []

    if (categories?.data?.topCategories) {
      return categories.data?.topCategories.map((firstOption, firstIdx) => {
        const firstValue = firstIdx + 1
        return {
          label: firstOption?.name,
          value: firstValue,
          children: firstOption?.secondCategories?.map((secondOption, secondIdx) => {
            const secondValue = firstValue + secondIdx + 1
            return {
              label: secondOption?.name,
              value: secondValue,
              children: secondOption?.categories?.map(thirdOption => ({
                id: thirdOption?.id,
                value: thirdOption?.id || "",
                label: thirdOption?.name,
              })),
            }
          }),
        }
      })
    }
  }, [categories])
  console.log(options)

  const handleChangeLimit = (dataKey: number) => {
    setPage(1)
    setLimit(dataKey)
  }

  const handleCreate = () => {
    addClinicMutation({
      variables: {
        name: newClinic.name,
        categories: newClinic.categories,
        county: newClinic.county,
        town: newClinic.town,
        address: newClinic.address,
        description: newClinic.description,
        phone: newClinic.phone,
        web: newClinic.web,
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
          <Modal
            title="新增診所"
            open={open}
            confirmText="新增"
            cancelText="取消"
            onConfirm={handleCreate}
            onClose={() => setOpen(false)}>
            <div className="px-5 mb-5" style={{ overflow: "auto", height: "500px" }}>
              <Form>
                <Form.Group layout="vertical">
                  <Form.Label required>診所名稱</Form.Label>
                  <Form.Input
                    type="text"
                    onChange={e => setNewClinic({ ...newClinic, name: e.target.value + "" })}
                  />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label required>大分類</Form.Label>
                  <MultiCascader
                    data={options || []}
                    style={{ width: 280 }}
                    onChange={value => {
                      setNewClinic({ ...newClinic, categories: value as string[] })
                    }}
                  />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label required>電子信箱</Form.Label>
                  <Form.Input
                    type="email"
                    onChange={e => setNewClinic({ ...newClinic, email: e.target.value + "" })}
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
                      onChange={e => setNewClinic({ ...newClinic, county: e.target.value + "" })}
                    />
                    <Form.Input
                      type="text"
                      placeholder="地區"
                      className="mr-4"
                      style={{ flex: "1 1 300px" }}
                      onChange={e => setNewClinic({ ...newClinic, town: e.target.value + "" })}
                    />
                    <Form.Input
                      type="text"
                      placeholder="地址"
                      onChange={e => setNewClinic({ ...newClinic, address: e.target.value + "" })}
                    />
                  </div>
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>診所網址</Form.Label>
                  <Form.Input
                    type="url"
                    onChange={e => setNewClinic({ ...newClinic, web: e.target.value + "" })}
                  />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>診所電話</Form.Label>
                  <Form.Input
                    type="tel"
                    onChange={e => setNewClinic({ ...newClinic, phone: e.target.value + "" })}
                  />
                </Form.Group>
                <Form.Group layout="vertical">
                  <Form.Label>診所介紹</Form.Label>
                  <Editor
                    onEdit={newValue => {
                      setNewClinic({ ...newClinic, description: newValue + "" })
                    }}
                  />
                </Form.Group>
              </Form>
            </div>
          </Modal>
        </Card.Header>
        <Card.Body>
          <Table height={400} data={clinics}>
            <Column width={70} align="center" fixed>
              <HeaderCell>序號</HeaderCell>
              <Cell dataKey="index" />
            </Column>

            <Column width={160} fixed>
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
    </>
  )
}

export default ClinicCard
