import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import Editor from "components/Editor"
import { MultiCascader } from "rsuite"

import data from "../category.json"

const InfoCard = () => {
  return (
    <Card>
      <Card.Header title="星采醫學美容診所" />
      <Card.Body>
        <Form>
          <Form.Group layout="vertical">
            <Form.Label required>診所名稱</Form.Label>
            <Form.Input type="text" value="星采醫學美容診所" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label required>大小分類</Form.Label>
            <MultiCascader
              data={data}
              searchable={false}
              menuStyle={{ padding: "6px 0" }}
              style={{ width: 280 }}
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
                value="台北市"
              />
              <Form.Input
                type="text"
                placeholder="地區"
                className="mr-4"
                style={{ flex: "1 1 300px" }}
                value="中正區"
              />
              <Form.Input type="text" placeholder="地址" value="羅斯福路一段32號2樓" />
            </div>
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>診所網址</Form.Label>
            <Form.Input type="url" value="starclinic.com.tw" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>診所電話</Form.Label>
            <Form.Input type="tel" value="02-2395-1167" />
          </Form.Group>
          <Form.Group layout="vertical">
            <Form.Label>診所介紹</Form.Label>
            <Editor
              onEdit={newValue => {
                console.log(newValue)
              }}
            />
          </Form.Group>
          <div className="flex justify-end">
            <Button style={{ marginRight: "10px" }}>儲存</Button>
            <Button variant="secondary">清除</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default InfoCard
