import Button from "components/Button"
import Card from "components/Card"
import MemberTable from "./MemberTable"
import Select from "components/Select"
import Layout from "components/Layout"

const SystemSettings = () => {
  const options = [
    { value: "小分類美容項目01", eventKey: "vanilla" },
    { value: "小分類美容項目02", eventKey: "strawberry" },
    { value: "小分類美容項目03", eventKey: "chocolate" },
    { value: "小分類美容項目04", eventKey: "mango" },
    { value: "小分類美容項目05", eventKey: "passionfruit" },
    { value: "小分類美容項目06", eventKey: "hazelnut" },
    { value: "小分類美容項目07", eventKey: "durian" },
  ]
  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>系統</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <Card>
        <Card.Header title="設定分類" />
        <Card.Body>
          <h3>整形手術</h3>
          <Select
            isMulti
            defaultValue={[options[0], options[1]]}
            placeholder="Select.."
            onChange={(e, value) => console.log("onChange", value)}>
            {options.map(option => (
              <Select.Option key={option.value} value={option.value} eventKey={option.eventKey}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
          <h3>皮膚治療</h3>
          <Select
            isMulti
            defaultValue={[options[0], options[1]]}
            placeholder="Select.."
            onChange={(e, value) => console.log("onChange", value)}>
            {options.map(option => (
              <Select.Option key={option.value} value={option.value} eventKey={option.eventKey}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
          <h3>毛髮改善</h3>
          <Select
            isMulti
            defaultValue={[options[0], options[1]]}
            placeholder="Select.."
            onChange={(e, value) => console.log("onChange", value)}>
            {options.map(option => (
              <Select.Option key={option.value} value={option.value} eventKey={option.eventKey}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
          <h3>審美牙科</h3>
          <Select
            isMulti
            defaultValue={[options[0], options[1]]}
            placeholder="Select.."
            onChange={(e, value) => console.log("onChange", value)}>
            {options.map(option => (
              <Select.Option key={option.value} value={option.value} eventKey={option.eventKey}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
          <h3>微整注射</h3>
          <Select
            isMulti
            defaultValue={[options[0], options[1]]}
            placeholder="Select.."
            onChange={(e, value) => console.log("onChange", value)}>
            {options.map(option => (
              <Select.Option key={option.value} value={option.value} eventKey={option.eventKey}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
          <h3>雷射光療</h3>
          <Select
            isMulti
            defaultValue={[options[0], options[1]]}
            placeholder="Select.."
            onChange={(e, value) => console.log("onChange", value)}>
            {options.map(option => (
              <Select.Option key={option.value} value={option.value} eventKey={option.eventKey}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
          <h3>身體雕塑</h3>
          <Select
            isMulti
            defaultValue={[options[0], options[1]]}
            placeholder="Select.."
            onChange={(e, value) => console.log("onChange", value)}>
            {options.map(option => (
              <Select.Option key={option.value} value={option.value} eventKey={option.eventKey}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
          <h3>埋線拉提</h3>
          <Select
            isMulti
            defaultValue={[options[0], options[1]]}
            placeholder="Select.."
            onChange={(e, value) => console.log("onChange", value)}>
            {options.map(option => (
              <Select.Option key={option.value} value={option.value} eventKey={option.eventKey}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
          <h3>中醫美容</h3>
          <Select
            isMulti
            defaultValue={[options[0], options[1]]}
            placeholder="Select.."
            onChange={(e, value) => console.log("onChange", value)}>
            {options.map(option => (
              <Select.Option key={option.value} value={option.value} eventKey={option.eventKey}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
          <h3>其他項目</h3>
          <Select
            isMulti
            defaultValue={[options[0], options[1]]}
            placeholder="Select.."
            onChange={(e, value) => console.log("onChange", value)}>
            {options.map(option => (
              <Select.Option key={option.value} value={option.value} eventKey={option.eventKey}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
          <Button style={{ marginTop: "10px", marginRight: "10px" }}>儲存</Button>
          <Button variant="secondary" style={{ marginTop: "10px" }}>取消</Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header title="會員列表">
          <Button variant="secondary">新增</Button>
        </Card.Header>
        <Card.Body>
          <MemberTable />
        </Card.Body>
      </Card>
    </>
  )
}

export default SystemSettings