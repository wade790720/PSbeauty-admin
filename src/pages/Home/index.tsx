import Layout from "components/Layout"
import QueryStatus from "components/QueryStatus"
import AdListCard from "./AdListCard"
import CarouselCard from "./CarouselCard"
import { SortEnumType } from "types/schema"
import { useGetHomeQuery } from "./Home.graphql.generated"
import { useGetAdImagesQuery } from "graphql/queries/getAdImage.graphql.generated"

const Home = () => {
  const getHomeQuery = useGetHomeQuery({
    variables: {
      first: 10,
      orderId: SortEnumType.Desc,
    },
  })

  const adImageQuery = useGetAdImagesQuery({
    variables: {
      first: 10,
      orderId: SortEnumType.Desc,
      where: "首頁輪播",
    },
  })

  if (getHomeQuery.loading && adImageQuery.loading) return <QueryStatus.Loading />
  if (getHomeQuery.error && adImageQuery.error) return <QueryStatus.Error />

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>首頁</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <AdListCard data={getHomeQuery.data?.adCards || null} />
      <CarouselCard data={adImageQuery.data?.adImages || null} />
    </>
  )
}

export default Home
