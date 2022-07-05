import Layout from "components/Layout"
import QueryStatus from "components/QueryStatus"
import CategoryCard from "./CategoryCard"
import MemberCard from "./MemberCard"
import KeywordCard from "./KeywordCard"
import { useGetSettingQuery } from "./SystemSettings.graphql.generated"

const SystemSettings = () => {
  const { data, loading, error } = useGetSettingQuery()

  if (loading) return <QueryStatus.Loading />
  if (error) return <QueryStatus.Error />
  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>系統</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <CategoryCard />
      <KeywordCard data={data?.popularKeywords || null} />
      <MemberCard data={data?.users || null} />
    </>
  )
}

export default SystemSettings
