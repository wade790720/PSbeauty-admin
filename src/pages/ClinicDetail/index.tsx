import InfoCard from "./InfoCard"
import ContactCard from "./ContactCard"
import CarouselCard from "./CarouselCard"
import CaseCard from "./CaseCard"
import TeamCard from "./TeamCard"
import Layout from "components/Layout"

const CosmeticClinicDetail = () => {
  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item href="#/cms/cosmetic-clinic">診所</Layout.Breadcrumbs.Item>
        <Layout.Breadcrumbs.Item>診所資訊</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <InfoCard />
      <ContactCard />
      <CarouselCard />
      <CaseCard />
      <TeamCard />
    </>
  )
}

export default CosmeticClinicDetail
