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

  const adImageHomeQuery = useGetAdImagesQuery({
    variables: {
      first: 10,
      orderId: SortEnumType.Desc,
      where: "首頁輪播",
    },
  })

  const adImageClinicQuery = useGetAdImagesQuery({
    variables: {
      first: 10,
      orderId: SortEnumType.Desc,
      where: "診所輪播",
    },
  })

  const adImageCaseQuery = useGetAdImagesQuery({
    variables: {
      first: 10,
      orderId: SortEnumType.Desc,
      where: "案例輪播",
    },
  })

  if (
    getHomeQuery.loading &&
    adImageHomeQuery.loading &&
    adImageClinicQuery.loading &&
    adImageCaseQuery.loading
  )
    return <QueryStatus.Loading />
  if (
    getHomeQuery.error &&
    adImageHomeQuery.error &&
    adImageClinicQuery.error &&
    adImageCaseQuery.error
  )
    return <QueryStatus.Error />

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>首頁</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <AdListCard data={getHomeQuery.data?.adCards || null} />
      <CarouselCard data={adImageHomeQuery.data?.adImages || null} usageType="home" />
      <CarouselCard data={adImageClinicQuery.data?.adImages || null} usageType="clinic" />
      <CarouselCard data={adImageCaseQuery.data?.adImages || null} usageType="case" />
    </>
  )
}

export default Home
