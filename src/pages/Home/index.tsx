import Layout from "components/Layout"
import QueryStatus from "components/QueryStatus"
import AdListCard from "./AdListCard"
import CarouselCard from "./CarouselCard"
import { SortEnumType } from "types/schema"
import { useGetHomeQuery } from "./Home.graphql.generated"

const Home = () => {
  const { data, loading, error } = useGetHomeQuery({
    variables: {
      adCardsFirst: 5,
      adCardsOrderId: SortEnumType.Desc,
      adImagesFirst: 5,
      adImagesOrderId: SortEnumType.Desc,
      adImagesWhere: "首頁輪播",
    },
  })

  if (loading) return <QueryStatus.Loading />
  if (error) return <QueryStatus.Error />

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>首頁</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      {data && <AdListCard data={data?.adCards} />}
      {data && <CarouselCard data={data?.adImages} />}
    </>
  )
}

export default Home
