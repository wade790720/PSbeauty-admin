import { useRef, useState } from "react"
import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import List from "./List"
import {
  GetSettingQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from "../SystemSettings.graphql.generated"

type CategoryCardProps = {
  data: GetSettingQuery["topCategories"]
}

const CategoryCard = ({ data }: CategoryCardProps) => {
  const [category, setCategory] = useState(data?.[0] || null)
  const [secondCategory, setSecondCategory] = useState(data?.[0]?.secondCategories?.[0] || null)

  const [addCategoryMutation] = useAddCategoryMutation()
  const [deleteCategoryMutation] = useDeleteCategoryMutation()

  const handleAdd = () => {
    addCategoryMutation({
      variables: {
        topParent: "整形手術",
        parent: "臉頰",
        name: null,
      },
    })
  }

  const handleDelete = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteCategoryMutation({
        variables: {
          id,
        },
      })
  }

  return (
    <Card>
      <Card.Header title="設定分類" />
      <Card.Body>
        <div className="inline-flex w-full">
          <div className="flex-auto p-4 w-2/6">
            <div className="text-lg pb-4">大分類</div>
            <List defaultActive={data?.[0]?.name || ""}>
              {data?.map((item, index) => (
                <List.Item
                  key={item + "-" + index}
                  value={item?.name || ""}
                  onClick={() => {
                    setCategory(item)
                    setSecondCategory(item?.secondCategories?.[0] || null)
                  }}>
                  {item?.name}
                </List.Item>
              ))}
            </List>
          </div>
          <div className="flex-auto p-4 w-2/6">
            <div className="text-lg pb-4">中分類</div>
            <List key={category?.name}>
              {category?.secondCategories?.map((item, index) => (
                <List.Item
                  key={item + "-" + index}
                  value={item?.name || ""}
                  onClick={() => {
                    setSecondCategory(item)
                  }}>
                  {item?.name}
                </List.Item>
              ))}
            </List>
            <div className="flex items-center mt-4">
              <Form.Input type="text" className="mr-4" />
              <Button onClick={handleAdd}>新增</Button>
            </div>
          </div>
          <div className="flex-auto p-4 w-2/6">
            <div className="text-lg pb-4">小分類</div>
            <List key={secondCategory?.name}>
              {secondCategory?.categories?.map((item, index) => (
                <List.Item
                  key={item + "-" + index}
                  value={item?.name || ""}
                  onClick={() => handleDelete(item?.id || "")}>
                  {item?.name}
                </List.Item>
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
