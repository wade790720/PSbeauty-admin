/* eslint-disable prettier/prettier */
import { useState, useMemo, useReducer, useEffect } from "react"
import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import List from "../components/List"
import {
  GetCategoriesQuery,
  useAddTopCategoryMutation,
  useAddSecondCategoryMutation,
  useAddCategoryMutation,
  useDeleteTopCategoryMutation,
  useDeleteSecondCategoryMutation,
  useDeleteCategoryMutation,
  useSetTopCategoryOrderMutation,
  useSetSecondCategoryOrderMutation,
  useSetCategoryOrderMutation
} from "../SystemSettings.graphql.generated"
import { useForm } from "react-hook-form"
import { ReactSortable } from "react-sortablejs";

type CategoryCardProps = {
  data: GetCategoriesQuery["topCategories"]
}

type Inputs = {
  topCategory: string
  secondCategory: string
  category: string
}

type Category = {
  id: string;
  name: string;
  secondCategories: {
    id: string;
    name: string;
    categories: {
      id: string;
      name: string;
    }[];
  }[];
}

type SecondCategory = {
  id: string;
  name: string;
  categories: {
    id: string;
    name: string;
  }[];
}

type ThirdCategory = {
  id: string;
  name: string;
}

const CategoryCard = ({ data }: CategoryCardProps) => {
  const categories = useMemo(() => {
    if (!data) return []

    return data?.map(firstItem => ({
      id: firstItem?.id || "",
      name: firstItem?.name || "",
      secondCategories: firstItem?.secondCategories?.map(secondItem => ({
        id: secondItem?.id || "",
        name: secondItem?.name || "",
        categories: secondItem?.categories?.map(thirdItem => ({
          id: thirdItem?.id || "",
          name: thirdItem?.name || "",
        })) || [],
      })) || [],
    }))
  }, [data])

  console.log(categories)

  const [topCategoryId, setTopCategoryId] = useState(categories?.[0]?.id || "")
  const [secondCategoryId, setSecondCategoryId] = useState(categories?.[0]?.secondCategories?.[0]?.id || "")

  const [topCategorySort, setTopCategorySort] = useState(categories);
  const [secondCategorySort, setSecondCategorySort] = useState(categories.find(category => category.id === topCategoryId)?.secondCategories || []);
  const [thirdCategorySort, setThirdCategorySort] = useState(categories.find(category => category.id === topCategoryId)?.secondCategories.find(item => item.id === secondCategoryId)?.categories || []);


  useEffect(() => {
    if(!topCategoryId && !secondCategoryId){
      setTopCategoryId(categories?.[0]?.id)
      setSecondCategoryId(categories?.[0]?.secondCategories?.[0]?.id)
    }
    setTopCategorySort(categories)
    setSecondCategorySort(categories.find(category => category.id === topCategoryId)?.secondCategories || [])
    setThirdCategorySort(categories
      .find(category => category.id === topCategoryId)
      ?.secondCategories?.find(item => item.id === secondCategoryId)?.categories || [])
  }, [categories, topCategoryId, secondCategoryId])

  const { register, getValues, reset } = useForm<Inputs>({ mode: "onTouched" })
  const [addTopCategoryMutation] = useAddTopCategoryMutation({ refetchQueries: ["GetCategories"] })
  const [addSecondCategoryMutation] = useAddSecondCategoryMutation({ refetchQueries: ["GetCategories"] })
  const [addCategoryMutation] = useAddCategoryMutation({ refetchQueries: ["GetCategories"] })
  const [deleteTopCategoryMutation] = useDeleteTopCategoryMutation({ refetchQueries: ["GetCategories"] })
  const [deleteSecondCategoryMutation] = useDeleteSecondCategoryMutation({ refetchQueries: ["GetCategories"] })
  const [deleteCategoryMutation] = useDeleteCategoryMutation({ refetchQueries: ["GetCategories"] })

  const [setTopCategoryOrderMutation] = useSetTopCategoryOrderMutation({ refetchQueries: ["GetCategories"] })
  const [setSecondCategoryOrderMutation] = useSetSecondCategoryOrderMutation({ refetchQueries: ["GetCategories"] })
  const [setCategoryOrderMutation] = useSetCategoryOrderMutation({ refetchQueries: ["GetCategories"] })

  const handleAddTopCategory = async () => {
    try {
      await addTopCategoryMutation({
        variables: {
          name: getValues().topCategory,
        },
      })
      reset({ topCategory: "" })
    } catch (error) {
      alert("新增失敗：" + error)
    }
  }

  const handleAddSecondCategory = async () => {
    try {
      await addSecondCategoryMutation({
        variables: {
          name: getValues().secondCategory,
          topCategoryId,
        },
      })
      reset({ secondCategory: "" })
    } catch (error) {
      alert("新增失敗：" + error)
    }
  }

  const handleAddCategory = async () => {
    try {
      await addCategoryMutation({
        variables: {
          name: getValues().category,
          topCategoryId,
          secondCategoryId,
        },
      })
      reset({ category: "" })
    } catch (error) {
      alert("新增失敗：" + error)
    }
  }

  const handleDeleteTopCategory = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask) {
      try {
        deleteTopCategoryMutation({
          variables: {
            id,
          },
        })
      } catch (error) {
        alert("刪除失敗：" + error)
      }
    }
  }

  const handleDeleteSecondCategory = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask) {
      try {
        deleteSecondCategoryMutation({
          variables: {
            id,
          },
        })
      } catch (error) {
        alert("刪除失敗：" + error)
      }
    }
  }

  const handleDeleteCategory = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask) {
      try {
        deleteCategoryMutation({
          variables: {
            id,
          },
        })
      } catch (error) {
        alert("刪除失敗：" + error)
      }
    }
  }


  const handleTopCategorySort = (newState: Category[]) => {
    if (JSON.stringify(newState) !== JSON.stringify(topCategorySort)) {
      try {
        setTopCategoryOrderMutation({
          variables: {
            sorted: newState.map(state => state.id)
          }
        })
      } catch (error) {
        alert("移動失敗：" + error)
        console.log(error, newState)
      }

      setTopCategorySort(newState)
    }
  }

  const handleSecondCategorySort = (newState: SecondCategory[]) => {
    if (JSON.stringify(newState) !== JSON.stringify(secondCategorySort)) {
      try {
        setSecondCategoryOrderMutation({
          variables: {
            topCategoryId,
            sorted: newState.map(state => state.id)
          }
        })
      } catch (error) {
        alert("移動失敗：" + error)
        console.log(error, newState)
      }
      setSecondCategorySort(newState)
    }
  }

  const handleThirdCategorySort = (newState: ThirdCategory[]) => {
    if (JSON.stringify(newState) !== JSON.stringify(thirdCategorySort)) {
      try {
        setCategoryOrderMutation({
          variables: {
            secondCategoryId,
            sorted: newState.map(state => state.id)
          }
        })
      } catch (error) {
        alert("移動失敗：" + error)
        console.log(error, newState)
      }
      setThirdCategorySort(newState)
    }
  }

  return (
    <Card>
      <Card.Header title="設定分類" />
      <Card.Body>
        <div className="inline-flex w-full">
          <div className="flex-auto p-4 w-2/6">
            <div className="text-lg pb-4">第一層分類</div>
            <List>
              <ReactSortable
                list={topCategorySort}
                setList={(newState) => handleTopCategorySort(newState)}
                animation={200}
                delay={2}>
                {topCategorySort?.map((item, index) => (
                  <List.Item
                    key={item.id + "-" + index}
                    value={item.name}
                    active={item.id === topCategoryId}
                    onClick={() => {
                      setTopCategoryId(item.id)

                      if (item.secondCategories && item.secondCategories?.length > 0) {
                        setSecondCategoryId(item.secondCategories?.[0].id || "")
                      }
                    }}
                    onRemove={() => {
                      handleDeleteTopCategory(item.id)
                    }}>
                    {item.name}
                  </List.Item>
                ))}
              </ReactSortable>
            </List>
            <div className="flex items-center mt-4">
              <Form.Input type="text" className="mr-4" {...register("topCategory")} />
              <Button onClick={handleAddTopCategory}>新增</Button>
            </div>
          </div>

          <div className="flex-auto p-4 w-2/6">
            <div className="text-lg pb-4">第二層分類</div>
            <List>
              <ReactSortable
                list={secondCategorySort}
                setList={(newState) => handleSecondCategorySort(newState)}
                animation={200}
                delay={2}>
                {secondCategorySort?.map((item, index) => (
                  <List.Item
                    key={item.id + "-" + index}
                    value={item.name}
                    active={item.id === secondCategoryId}
                    onClick={() => {
                      setSecondCategoryId(item.id)
                    }}
                    onRemove={() => {
                      handleDeleteSecondCategory(item.id)
                    }}>
                    {item.name}
                  </List.Item>
                ))}
              </ReactSortable>
            </List>
            <div className="flex items-center mt-4">
              <Form.Input type="text" className="mr-4" {...register("secondCategory")} />
              <Button onClick={handleAddSecondCategory}>新增</Button>
            </div>
          </div>

          <div className="flex-auto p-4 w-2/6">
            <div className="text-lg pb-4">第三層分類</div>
            <List>
              <ReactSortable
                list={thirdCategorySort}
                setList={(newState) => handleThirdCategorySort(newState)}
                animation={200}
                delay={2}>
                {thirdCategorySort?.map((item, index) => (
                  <List.Item
                    key={item.id + "-" + index}
                    value={item.name || ""}
                    onRemove={() => {
                      handleDeleteCategory(item?.id)
                    }}>
                    {item.name}
                  </List.Item>
                ))}
              </ReactSortable>
            </List>
            <div className="flex items-center mt-4">
              <Form.Input type="text" className="mr-4" {...register("category")} />
              <Button onClick={handleAddCategory}>新增</Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CategoryCard
