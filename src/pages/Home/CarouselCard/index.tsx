import { useMemo, useRef, useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import { Table } from "rsuite"
import { GetAdImagesQuery } from "graphql/queries/getAdImage.graphql.generated"
import {
  useAddAdImageMutation,
  useUpdateAdImageMutation,
  useDeleteAdImageMutation,
} from "graphql/mutations/adImage.graphql.generated"
import CarouselModal, { Carousel } from "components/CarouselModal"

type CarouselCardProps = {
  data: GetAdImagesQuery["adImages"]
}

const CarouselCard = ({ data }: CarouselCardProps) => {
  const { Column, HeaderCell, Cell } = Table

  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [reviewCarousel, setReviewCarousel] = useState<Carousel>()

  const slides = useMemo(() => {
    if (!data?.edges) return []

    return data.edges
      ?.map(card => ({
        index: card.node?.sort || 0,
        id: card.node?.id || "",
        title: card.node?.title || "",
        status: card.node?.status === true ? "開啟" : "關閉",
        url: card.node?.redirectType + "/" + card.node?.targetId,
        image: card.node?.image || "",
      }))
      .sort((a, b) => a.index - b.index)
  }, [data])

  const [addAdImageMutation] = useAddAdImageMutation({ refetchQueries: ["GetAdImages"] })
  const [updateAdImageMutation] = useUpdateAdImageMutation({ refetchQueries: ["GetAdImages"] })
  const [deleteAdImageMutation] = useDeleteAdImageMutation({ refetchQueries: ["GetAdImages"] })

  const handleCreate = (carousel: Carousel) => {
    if (slides.length >= 10) {
      alert("超過10張輪播圖上限，請刪除掉，再做新增")
      return
    }
    addAdImageMutation({
      variables: {
        usageType: "首頁輪播",
        title: carousel.title,
        redirect: carousel.advancedOption,
        sort: carousel.sort,
        targetId: (carousel.advancedOption === "case" ? carousel.caseId : carousel.clinicId) || "",
        image: carousel.image || "",
        status: carousel.status,
      },
    })
  }

  const handleUpdate = (carousel: Carousel) => {
    updateAdImageMutation({
      variables: {
        id: carousel.id || "",
        usageType: "首頁輪播",
        title: carousel.title,
        redirect: carousel.advancedOption,
        sort: carousel.sort,
        targetId: (carousel.advancedOption === "case" ? carousel.caseId : carousel.clinicId) || "",
        status: carousel.status,
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
          <Table height={400} data={slides}>
            <Column width={70} align="center" fixed>
              <HeaderCell>序號</HeaderCell>
              <Cell dataKey="index" />
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

            <Column width={120} fixed="right">
              <HeaderCell>動作</HeaderCell>
              <Cell>
                {rowData => {
                  return (
                    <span>
                      <LinkButton
                        onClick={() => {
                          setOpenEditModal(true)
                          setReviewCarousel({
                            id: rowData.id,
                            title: rowData.title,
                            sort: rowData.index,
                            status: rowData.status === "開啟" ? true : false,
                            advancedOption: rowData.url.split("/")[0],
                            clinicId: rowData.url.split("/")[1],
                            image: rowData.image,
                          })
                        }}>
                        {" "}
                        編輯{" "}
                      </LinkButton>{" "}
                      | <LinkButton onClick={() => handleDelete(rowData.id)}> 刪除 </LinkButton>
                    </span>
                  )
                }}
              </Cell>
            </Column>
          </Table>
        </Card.Body>
      </Card>

      <CarouselModal
        type="add"
        open={openAddModal}
        sortList={slides.map(slide => slide.index)}
        onClose={() => setOpenAddModal(false)}
        onSubmit={handleCreate}
      />

      <CarouselModal
        type="edit"
        defaultCarousel={{
          title: reviewCarousel?.title || "",
          clinicId: reviewCarousel?.clinicId || "",
          sort: reviewCarousel?.sort || 0,
          advancedOption: reviewCarousel?.advancedOption || "clinic",
          image: reviewCarousel?.image,
          status: reviewCarousel?.status || true,
        }}
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSubmit={handleUpdate}
      />
    </>
  )
}

export default CarouselCard
