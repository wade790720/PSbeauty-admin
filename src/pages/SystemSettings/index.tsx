import Layout from "components/Layout"
import QueryStatus from "components/QueryStatus"
import CategoryCard from "./CategoryCard"
import MemberCard from "./MemberCard"
import KeywordCard from "./KeywordCard"
import { useGetSettingQuery, useGetCategoriesQuery } from "./SystemSettings.graphql.generated"

const SystemSettings = () => {
  const categories = useGetCategoriesQuery({ fetchPolicy: "no-cache" })
  const { data, loading, error } = useGetSettingQuery()

  if (loading && categories.loading) return <QueryStatus.Loading />
  if (error && categories.error) return <QueryStatus.Error />
  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>系統</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <CategoryCard data={categories.data?.topCategories || null} />
      <KeywordCard data={data?.popularKeywords || null} />
      <MemberCard />
    </>
  )
}

export default SystemSettings
