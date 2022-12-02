import ClinicCard from "./ClinicCard"
import Layout from "components/Layout"
import QueryStatus from "components/QueryStatus"
import { SortEnumType } from "types/schema"
import { useGetClinicQuery } from "./Clinic.graphql.generated"

const CosmeticClinic = () => {
  const { data, loading, error } = useGetClinicQuery({
    variables: {
      first: 800,
      orderId: SortEnumType.Desc,
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
    </>
  )
}

export default CosmeticClinic
