import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import List from "./List"

const CategoryCard = () => {
  const bigCategory = [
    "整形手術",
    "皮膚治療",
    "毛髮改善",
    "審美牙科",
    "微整注射",
    "雷射光療",
    "身體雕塑",
    "埋線拉提",
    "中醫美容",
    "其他項目",
  ]
  const midCategory = ["眼睛", "臉頰", "鼻子", "嘴唇", "下巴", "額頭"]
  const smallCategory = [
    "美容項目01",
    "美容項目02",
    "美容項目03",
    "美容項目04",
    "美容項目05",
    "美容項目06",
    "美容項目07",
    "美容項目08",
    "美容項目09",
    "美容項目10",
    "美容項目11",
  ]
  return (
    <Card>
      <Card.Header title="設定分類" />
      <Card.Body>
        <div className="inline-flex w-full">
          <div className="flex-auto p-4 w-2/6">
            <div className="text-lg pb-4">大分類</div>
            <List>
              {bigCategory.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
          </div>
          <div className="flex-auto p-4 w-2/6">
            <div className="text-lg pb-4">中分類</div>
            <List>
              {midCategory.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
            <div className="flex items-center mt-4">
              <Form.Input type="text" className="mr-4" />
              <Button>新增</Button>
            </div>
          </div>
          <div className="flex-auto p-4 w-2/6">
            <div className="text-lg pb-4">小分類</div>
            <List>
              {smallCategory.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
            <div className="flex items-center mt-4">
              <Form.Input type="text" className="mr-4" />
              <Button>新增</Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CategoryCard
