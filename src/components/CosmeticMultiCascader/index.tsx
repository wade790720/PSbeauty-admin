import { MultiCascader } from "rsuite"
import { useMemo } from "react"
import { useGetCategoriesQuery } from "./CosmeticMultiCascader.graphql.generated"

type ValueType = (string | number)[]
type CosmeticMultiCascaderProps = {
  defaultValue?: ValueType
  onChange?: (value: ValueType) => void
}

const CosmeticMultiCascader = (props: CosmeticMultiCascaderProps) => {
  const { data } = useGetCategoriesQuery()

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

  return (
    <MultiCascader
      searchable={false}
      defaultValue={props.defaultValue}
      data={options || []}
      onChange={value => props.onChange && props.onChange(value)}
      menuStyle={{ padding: "6px 0" }}
      placeholder="請選擇分類"
      style={{ width: 280 }}
    />
  )
}

export default CosmeticMultiCascader
