import ClinicCard from "./ClinicCard"
import CarouselCard from "./CarouselCard"

import Layout from "components/Layout"
import QueryStatus from "components/QueryStatus"
import { SortEnumType } from "types/schema"
import { useGetClinicQuery } from "./Clinic.graphql.generated"

const CosmeticClinic = () => {
  const { data, loading, error } = useGetClinicQuery({
    variables: {
      clinicFirst: 5,
      clinicOrderId: SortEnumType.Desc,
      adImagesFirst: 5,
      adImagesOrderId: SortEnumType.Desc,
      adImagesWhere: "診所輪播",
    },
  })

  if (loading) return <QueryStatus.Loading />
  if (error) return <QueryStatus.Error />

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>診所</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>

      {data && <ClinicCard data={data?.clinics} />}
      {data && <CarouselCard data={data?.adImages} />}
    </>
  )
}

export default CosmeticClinic
