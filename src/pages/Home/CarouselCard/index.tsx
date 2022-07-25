/* eslint-disable prettier/prettier */
import { useMemo, useState } from "react"
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
  usageType: "home" | "clinic" | "case"
}

const carouselType = {
  home: "首頁輪播",
  clinic: "診所輪播",
  case: "案例輪播",
}

const CarouselCard = ({ data, usageType }: CarouselCardProps) => {
  const { Column, HeaderCell, Cell } = Table

  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [reviewCarousel, setReviewCarousel] = useState<Carousel>()

  const slides = useMemo(() => {
    if (!data?.edges) return []

    return data.edges
      ?.map(card => {

        let url
        switch (card.node?.redirectType) {
          case "clinic": {
            url = card.node?.clinicId ? card.node?.redirectType + "/" + card.node?.clinicId : "無跳轉"
            break;
          }
          case "doctor": {
            url = "clinic/" + card.node?.clinicId + "/" + card.node?.redirectType
            break;
          }
          case "case": {
            url = "clinic/" + card.node?.clinicId + "/" + card.node?.redirectType + "/" + card.node?.targetId
            break;
          }
        }

        return {
          index: card.node?.sort || 0,
          id: card.node?.id || "",
          title: card.node?.title || "",
          status: card.node?.status === true ? "開啟" : "關閉",
          url,
          image: card.node?.image || "",
        }
      })
      .sort((a, b) => a.index - b.index)
  }, [data])

  const [addAdImageMutation] = useAddAdImageMutation({ refetchQueries: ["GetAdImages"] })
  const [updateAdImageMutation] = useUpdateAdImageMutation({ refetchQueries: ["GetAdImages"] })
  const [deleteAdImageMutation] = useDeleteAdImageMutation({ refetchQueries: ["GetAdImages"] })

  const handleCreate = (carousel: Carousel) => {
    if (slides.length >= 5) {
      alert("超過5張輪播圖上限，請刪除掉，再做新增")
      return
    }
    addAdImageMutation({
      variables: {
        usageType: carouselType[usageType],
        title: carousel.title,
        redirect: carousel.advancedOption,
        sort: carousel.sort,
        clinicId: carousel.clinicId,
        targetId: (carousel.advancedOption === "case" ? carousel.targetId : "") || "",
        image: carousel.image || "",
        status: carousel.status,
      },
    })
  }

  const handleUpdate = (carousel: Carousel) => {
    updateAdImageMutation({
      variables: {
        id: carousel.id || "",
        usageType: carouselType[usageType],
        title: carousel.title,
        redirect: carousel.advancedOption,
        sort: carousel.sort,
        clinicId: carousel.clinicId,
        targetId: (carousel.advancedOption === "case" ? carousel.targetId : "") || "",
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
        <Card.Header title={carouselType[usageType]}>
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
                          console.log("review", rowData)
                          setReviewCarousel({
                            id: rowData.id,
                            title: rowData.title,
                            sort: rowData.index,
                            image: rowData.image,
                            status: rowData.status === "開啟" ? true : false,
                            advancedOption: rowData.url.split("/")[2] !== "" ? rowData.url.split("/")[2] : "clinic",
                            clinicId: rowData.url.split("/")[1],
                            targetId: rowData.url.split("/")[3],
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
      {openAddModal && (
        <CarouselModal
          key={Math.floor(Math.random() * 5)}
          type="add"
          open={openAddModal}
          sortList={slides.map(slide => slide.index)}
          onClose={() => setOpenAddModal(false)}
          onSubmit={handleCreate}
        />
      )}


      <CarouselModal
        type="edit"
        defaultCarousel={{
          id: reviewCarousel?.id,
          title: reviewCarousel?.title || "",
          clinicId: reviewCarousel?.clinicId || "",
          targetId: reviewCarousel?.targetId || "",
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
