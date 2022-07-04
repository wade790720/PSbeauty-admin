import Layout from "components/Layout"
import CategoryCard from "./CategoryCard"
import MemberCard from "./MemberCard"
import KeywordCard from "./KeywordCard"

const SystemSettings = () => {
  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>系統</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <CategoryCard />
      <KeywordCard />
      <MemberCard />
    </>
  )
}

export default SystemSettings
