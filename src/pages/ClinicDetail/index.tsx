import InfoCard from "./InfoCard"
import ContactCard from "./ContactCard"
import CarouselCard from "./CarouselCard"
import CaseCard from "./CaseCard"
import DoctorsCard from "./DoctorsCard"
import Layout from "components/Layout"
import QueryStatus from "components/QueryStatus"
import { useMatch } from "react-router-dom"
import { useGetClinicQuery } from "./ClinicDetail.graphql.generated"

const CosmeticClinicDetail = () => {
  const match = useMatch("/cms/cosmetic-clinic/:id")
  const { data, loading, error } = useGetClinicQuery({
    variables: {
      id: match?.params.id || "",
    },
  })

  if (loading) return <QueryStatus.Loading />
  if (error) return <QueryStatus.Error />

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item href="#/cms/cosmetic-clinic">診所</Layout.Breadcrumbs.Item>
        <Layout.Breadcrumbs.Item>診所資訊</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      {data && (
        <>
          <InfoCard data={data.clinic} />
          <ContactCard data={data.clinic} />
          <CarouselCard data={data.clinic?.images || []} />
          <CaseCard data={data.clinic?.cases || []} />
          <DoctorsCard data={data.clinic?.doctors || []} />
        </>
      )}
    </>
  )
}

export default CosmeticClinicDetail
