/* eslint-disable prettier/prettier */
import { useState, useMemo, useReducer } from "react"
import Button from "components/Button"
import Card from "components/Card"
import Form from "components/Form"
import List from "./List"
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
  const [, forceRerender] = useReducer(x => x + 1, 0)

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



  const [topCategoryId, setTopCategoryId] = useState(categories?.[0]?.id)
  const [secondCategoryId, setSecondCategoryId] = useState(categories?.[0]?.secondCategories?.[0]?.id || "")

  const [topCategorySort, setTopCategorySort] = useState(categories);
  const [secondCategorySort, setSecondCategorySort] = useState(categories.find(category => category.id === topCategoryId)?.secondCategories || []);
  const [thirdCategorySort, setThirdCategorySort] = useState(categories.find(category => category.id === topCategoryId)?.secondCategories.find(item => item.id === secondCategoryId)?.categories || []);

  const secondCategories = useMemo(() => {
    const second = categories.find(category => category.id === topCategoryId)?.secondCategories || []
    setSecondCategorySort(second)

    return second
  }, [categories, topCategoryId])

  const thirdCategories = useMemo(() => {
    const third = categories
      .find(category => category.id === topCategoryId)
      ?.secondCategories?.find(item => item.id === secondCategoryId)?.categories || []
    setThirdCategorySort(third)

    return third
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
    await addTopCategoryMutation({
      variables: {
        name: getValues().topCategory,
      },
    })
    reset({ topCategory: "" })
  }

  const handleAddSecondCategory = async () => {
    await addSecondCategoryMutation({
      variables: {
        name: getValues().secondCategory,
        topCategoryId,
      },
    })
    reset({ secondCategory: "" })
    forceRerender()
  }

  const handleAddCategory = async () => {
    await addCategoryMutation({
      variables: {
        name: getValues().category,
        topCategoryId,
        secondCategoryId,
      },
    })
    reset({ category: "" })
  }

  const handleDeleteTopCategory = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteTopCategoryMutation({
        variables: {
          id,
        },
      })
  }

  const handleDeleteSecondCategory = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteSecondCategoryMutation({
        variables: {
          id,
        },
      })
  }

  const handleDeleteCategory = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteCategoryMutation({
        variables: {
          id,
        },
      })
  }


  const handleTopCategorySort = (newState: Category[]) => {
    if (JSON.stringify(newState) !== JSON.stringify(topCategorySort)) {
      setTopCategoryOrderMutation({
        variables: {
          sorted: newState.map(state => state.id)
        }
      })
      setTopCategorySort(newState)
    }
  }

  const handleSecondCategorySort = (newState: SecondCategory[]) => {
    if (JSON.stringify(newState) !== JSON.stringify(secondCategorySort)) {
      console.log(newState)
      setSecondCategoryOrderMutation({
        variables: {
          topCategoryId,
          sorted: newState.map(state => state.id)
        }
      })
      setSecondCategorySort(newState)
    }
  }

  const handleThirdCategorySort = (newState: ThirdCategory[]) => {
    if (JSON.stringify(newState) !== JSON.stringify(thirdCategorySort)) {
      setCategoryOrderMutation({
        variables: {
          secondCategoryId,
          sorted: newState.map(state => state.id)
        }
      })
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
            <List default={categories?.[0]?.name}>
              <ReactSortable
                list={topCategorySort}
                setList={(newState) => handleTopCategorySort(newState)}
                animation={200}
                delay={2}>
                {categories?.map((item, index) => (
                  <List.Item
                    key={item.id + "-" + index}
                    value={item.name}
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
            <List key={secondCategories?.[0]?.id} default={secondCategories?.[0]?.name}>
              <ReactSortable
                list={secondCategorySort}
                setList={(newState) => handleSecondCategorySort(newState)}
                animation={200}
                delay={2}>
                {secondCategories?.map((item, index) => (
                  <List.Item
                    key={item.id + "-" + index}
                    value={item.name}
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
            <List key={thirdCategories?.[0]?.id}>
              <ReactSortable
                list={thirdCategorySort}
                setList={(newState) => handleThirdCategorySort(newState)}
                animation={200}
                delay={2}>
                {thirdCategories?.map((item, index) => (
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
