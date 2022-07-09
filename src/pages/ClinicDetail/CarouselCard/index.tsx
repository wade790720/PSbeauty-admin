import { useState, useMemo } from "react"
import { Table } from "rsuite"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import CarouselModal, { Carousel } from "components/CarouselModal"
import {
  useAddAdImageMutation,
  useUpdateAdImageMutation,
  useDeleteAdImageMutation,
} from "graphql/mutations/adImage.graphql.generated"
import { ImagesFragment } from "../ClinicDetail.graphql.generated"

type CarouselCardProps = {
  data: ImagesFragment["images"]
}

const fakeData = [
  {
    id: 1,
    status: "open",
    title: "測試輪播",
    url: "/home",
    createTime: "2022-04-18",
  },
]

const CarouselCard = ({ data }: CarouselCardProps) => {
  const { Column, HeaderCell, Cell } = Table
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [addAdImageMutation] = useAddAdImageMutation({ refetchQueries: ["GetClinic"] })
  const [updateAdImageMutation] = useUpdateAdImageMutation({ refetchQueries: ["GetClinic"] })
  const [deleteAdImageMutation] = useDeleteAdImageMutation({ refetchQueries: ["GetClinic"] })

  const slides = useMemo(() => {
    if (!data) return []

    return data.map(slide => ({
      index: slide?.sort || 0,
      id: slide?.id || "",
      url: slide?.redirectType + "/" + slide?.targetId,
      image: slide?.image || "",
    }))
  }, [data])

  const handleCreate = (carousel: Carousel) => {
    if (slides.length >= 10) {
      alert("超過10張輪播圖上限，請刪除掉，再做新增")
      return
    }
    addAdImageMutation({
      variables: {
        title: "",
        usageType: "診所輪播",
        redirect: carousel.advancedOption,
        sort: 2,
        targetId: (carousel.advancedOption === "case" ? carousel.caseId : carousel.clinicId) || "",
        image: carousel.image || "",
        status: false,
      },
    })
  }

  const handleUpdate = () => {
    updateAdImageMutation({
      variables: {
        id: "",
        usageType: "首頁輪播",
        title: "",
        redirect: "Clinic",
        sort: 2,
        targetId: "clinic_id_xxx",
        status: false,
      },
    })
  }

  const handleDelete = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteAdImageMutation({
        variables: {
          id,
        },
      })
  }

  return (
    <>
      <Card>
        <Card.Header title="輪播">
          <Button variant="secondary" onClick={() => setOpenAddModal(true)}>
            新增
          </Button>
        </Card.Header>
        <Card.Body>
          <Table
            height={400}
            data={fakeData}
            onRowClick={data => {
              console.log(data)
            }}>
            <Column width={70} align="center" fixed>
              <HeaderCell>序號</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={70} align="center" fixed>
              <HeaderCell>狀態</HeaderCell>
              <Cell dataKey="status" />
            </Column>

            <Column width={200} fixed>
              <HeaderCell>標題</HeaderCell>
              <Cell dataKey="title" />
            </Column>

            <Column width={200} flexGrow={1}>
              <HeaderCell>超連結</HeaderCell>
              <Cell dataKey="url" />
            </Column>

            <Column width={200}>
              <HeaderCell>創建時間</HeaderCell>
              <Cell dataKey="createTime" />
            </Column>
            <Column width={120} fixed="right">
              <HeaderCell>動作</HeaderCell>
              <Cell>
                {rowData => {
                  return (
                    <span>
                      <LinkButton onClick={() => setOpenEditModal(true)}> 編輯 </LinkButton> |{" "}
                      <LinkButton onClick={() => handleDelete(rowData.id)}> 刪除 </LinkButton>
                    </span>
                  )
                }}
              </Cell>
            </Column>
          </Table>
        </Card.Body>
      </Card>

      <CarouselModal type="add" open={openAddModal} onClose={() => setOpenAddModal(false)} />

      <CarouselModal
        type="edit"
        defaultCarousel={{
          title: "",
          clinicId: "12",
          sort: 2,
          advancedOption: "clinic",
          image: "",
          status: false,
        }}
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSubmit={handleUpdate}
      />
    </>
  )
}

export default CarouselCard
