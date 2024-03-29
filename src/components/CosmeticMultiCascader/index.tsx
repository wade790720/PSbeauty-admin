import { MultiCascader } from "rsuite"
import { useMemo } from "react"
import { useGetCategoriesQuery } from "./CosmeticMultiCascader.graphql.generated"
import { useFormContext, useController } from "react-hook-form"

type ValueType = (string | number)[]
type CosmeticMultiCascaderProps = {
  name: string
}

const CosmeticMultiCascader = ({ name }: CosmeticMultiCascaderProps) => {
  const { data } = useGetCategoriesQuery()

  const { control } = useFormContext<{ [name: string]: ValueType }>()
  const {
    field: { onChange, ...field },
  } = useController({ control, name })

  const options = useMemo(() => {
    if (!data) return []

    if (data?.topCategories) {
      return data?.topCategories.map((firstOption, firstIdx) => {
        return {
          label: firstOption?.name,
          value: `${firstIdx + 1}`,
          children: firstOption?.secondCategories?.map((secondOption, secondIdx) => {
            return {
              label: secondOption?.name,
              value: `${firstIdx + 1}-${secondIdx + 1}`,
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
  }, [data])

  const mappingKey = (value: string) => {
    const result: string[] = []

    options?.forEach(option => {
      if (option.value === value) {
        option.children?.forEach(item => {
          item.children?.forEach(i => result.push(i.value))
        })
      } else {
        option.children?.forEach(item => {
          if (item.value === value) {
            item.children?.forEach(i => result.push(i.value))
          }
        })
      }
    })

    return result
  }

  const disable =
    options
      ?.map(option => {
        return option.children?.map(o => {
          if (o.children && o.children?.length > 0) return
          return o.value
        })
      })
      .flat() || []

  const disabledItemValues = disable.flatMap(f => (f ? [f] : []))
  const uncheckOptions: string[] = []

  options?.forEach(option => {
    uncheckOptions.push(option.value)
    option.children?.forEach(o => {
      uncheckOptions.push(o.value)
    })
  })

  const handleChange = (values: ValueType) => {
    const selectItem = [
      ...values.map(value => {
        return mappingKey(value.toString()).length === 0 ? value : mappingKey(value.toString())
      }),
    ].flat()

    onChange(selectItem)
  }

  return (
    <MultiCascader
      {...field}
      searchable={false}
      data={options || []}
      disabledItemValues={disabledItemValues}
      uncheckableItemValues={uncheckOptions}
      onChange={values => handleChange(values)}
      menuStyle={{ padding: "6px 0" }}
      placeholder="請選擇分類"
      style={{ width: 280 }}
    />
  )
}

export default CosmeticMultiCascader
