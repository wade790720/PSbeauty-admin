import { useState, useMemo } from "react"
import { Table } from "rsuite"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import CarouselModal, { Carousel } from "./CarouselModal"

import {
  useAddClinicImageMutation,
  useUpdateClinicImageMutation,
  useDeleteClinicImageMutation,
  ImagesFragment,
} from "../ClinicDetail.graphql.generated"

type CarouselCardProps = {
  data: ImagesFragment["images"]
}

const CarouselCard = ({ data }: CarouselCardProps) => {
  const { Column, HeaderCell, Cell } = Table
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [reviewSlide, setReviewSlide] = useState<Carousel>()

  const [addClinicImageMutation] = useAddClinicImageMutation({
    refetchQueries: ["GetClinicDetail"],
  })
  const [updateClinicImageMutation] = useUpdateClinicImageMutation({
    refetchQueries: ["GetClinicDetail"],
  })
  const [deleteClinicImageMutation] = useDeleteClinicImageMutation({
    refetchQueries: ["GetClinicDetail"],
  })

  const slides = useMemo(() => {
    if (!data) return []

    return data
      .map(slide => {
        let url
        switch (slide?.redirectType) {
          case "clinic": {
            url = "無跳轉"
            break
          }
          case "doctor": {
            url = "clinic/" + slide.clinic?.id + "/" + slide?.redirectType
            break
          }
          case "case": {
            url = "clinic/" + slide.clinic?.id + "/" + slide?.redirectType + "/" + slide?.targetId
            break
          }
        }

        return {
          index: slide?.sort || 0,
          id: slide?.id || "",
          title: slide?.title || "",
          url,
          image: slide?.image || "",
          status: slide?.status === true ? "開啟" : "關閉",
          clinic: slide?.clinic,
        }
      })
      .sort((a, b) => a.index - b.index)
  }, [data])

  const defaultCarousel = useMemo(() => {
    return {
      id: reviewSlide?.id,
      title: reviewSlide?.title || "",
      clinicId: reviewSlide?.clinicId || "",
      sort: reviewSlide?.sort || 1,
      advancedOption: reviewSlide?.advancedOption || "clinic",
      image: reviewSlide?.image || "",
      status: reviewSlide?.status || true,
      redirect: reviewSlide?.advancedOption === "clinic" ? "no" : "yes",
      targetId: reviewSlide?.targetId,
    }
  }, [reviewSlide])

  const handleCreate = (carousel: Carousel) => {
    if (slides.length >= 5) {
      alert("超過5張輪播圖上限，請刪除掉，再做新增")
      return
    }
    addClinicImageMutation({
      variables: {
        clinicId: carousel.redirect === "yes" ? carousel.clinicId : "",
        sort: carousel.sort,
        status: carousel.status,
        title: carousel.title,
        image: carousel.image || "",
        redirectType: carousel.advancedOption,
        targetId: (carousel.advancedOption === "case" ? carousel.targetId : "") || "",
      },
    })
  }

  const handleUpdate = (carousel: Carousel) => {
    updateClinicImageMutation({
      variables: {
        id: carousel.id || "",
        clinicId: carousel.clinicId,
        sort: carousel.sort,
        status: carousel.status,
        title: carousel.title,
        image: carousel.image || "",
        redirectType: carousel.advancedOption,
        targetId: (carousel.advancedOption === "case" ? carousel.targetId : "") || "",
      },
    })
  }

  const handleDelete = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask)
      deleteClinicImageMutation({
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
                          setReviewSlide({
                            id: rowData.id,
                            title: rowData.title,
                            sort: rowData.index,
                            image: rowData.image,
                            status: rowData.status === "開啟" ? true : false,
                            advancedOption:
                              rowData.url === "無跳轉" ? "clinic" : rowData.url.split("/")[2],
                            clinicId: rowData.clinic.id,
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
          type="add"
          open={openAddModal}
          sortList={slides.map(slide => slide.index)}
          onClose={() => setOpenAddModal(false)}
          onSubmit={handleCreate}
        />
      )}

      <CarouselModal
        type="edit"
        defaultCarousel={defaultCarousel}
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSubmit={handleUpdate}
      />
    </>
  )
}

export default CarouselCard
