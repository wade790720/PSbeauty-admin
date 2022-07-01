import { useState } from "react"
import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Editor from "components/Editor"
import { MultiCascader } from "rsuite"
import { useMatch } from "react-router-dom"

import fakeData from "../category.json"

import { GetClinicQuery, useUpdateClinicMutation } from "../ClinicDetail.graphql.generated"

type Clinic = {
  name: string
  county: string
  town: string
  address: string
  web: string
  phone: string
  description: string
  categories: string[]
}

type InfoCardProps = {
  data: GetClinicQuery["clinic"]
}

const InfoCard = ({ data }: InfoCardProps) => {
  const match = useMatch("/cms/cosmetic-clinic/:id")

  const [clinic, setClinic] = useState<Clinic>({
    name: data?.name || "",
    county: data?.county || "",
    town: data?.town || "",
    address: data?.address || "",
    web: data?.web || "",
    phone: data?.phone || "",
    description: data?.description || "",
    categories: (data?.categories || []).map(category => category?.id || ""),
  })

  const [updateClinicMutation] = useUpdateClinicMutation({
    variables: {
      id: match?.params.id || "",
      name: clinic.name || "",
      phone: clinic.phone || "",
      county: clinic.county || "",
      town: clinic.town || "",
      address: clinic.address || "",
      web: clinic.web || "",
      description: clinic.description || "",
      categories: clinic.categories || [],
    },
  })

  const handleSave = () => {
    updateClinicMutation()
  }

  const handleClear = () => {
    setClinic({
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
      <Card.Header title={clinic?.name || ""} />
      <Card.Body>
        (
        <Form>
          <Form.Group layout="vertical">
            <Form.Label required>診所名稱</Form.Label>
            <Form.Input
              type="text"
              value={clinic.name || ""}
              onChange={e => setClinic({ ...clinic, name: e.target.value + "" })}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>大小分類</Form.Label>
            <MultiCascader
              data={fakeData}
              searchable={false}
              menuStyle={{ padding: "6px 0" }}
              style={{ width: 280 }}
              value={clinic?.categories || [""]}
              placeholder="請選擇"
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
                onChange={e => setClinic({ ...clinic, county: e.target.value + "" })}
              />
              <Form.Input
                type="text"
                placeholder="地區"
                className="mr-4"
                style={{ flex: "1 1 300px" }}
                value={clinic.town}
                onChange={e => setClinic({ ...clinic, town: e.target.value + "" })}
              />
              <Form.Input
                type="text"
                placeholder="地址"
                value={clinic.address}
                onChange={e => setClinic({ ...clinic, address: e.target.value + "" })}
              />
            </div>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>診所網址</Form.Label>
            <Form.Input
              type="url"
              value={clinic.web}
              onChange={e => setClinic({ ...clinic, web: e.target.value + "" })}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>診所電話</Form.Label>
            <Form.Input
              type="tel"
              value={clinic.phone}
              onChange={e => setClinic({ ...clinic, phone: e.target.value + "" })}
            />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>診所介紹</Form.Label>
            <Editor
              value={clinic.description}
              onEdit={newValue => {
                setClinic({ ...clinic, description: newValue })
              }}
            />
          </Form.Group>
          <div className="flex justify-end">
            <Button style={{ marginRight: "10px" }} onClick={handleSave}>
              儲存
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              清除
            </Button>
          </div>
        </Form>
        )
      </Card.Body>
    </Card>
  )
}

export default InfoCard
