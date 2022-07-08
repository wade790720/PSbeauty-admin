import { useMemo, useState } from "react"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import { Table } from "rsuite"
import {
  GetHomeQuery,
  useAddAdImageMutation,
  useUpdateAdImageMutation,
  useDeleteAdImageMutation,
} from "../Home.graphql.generated"
import CarouselModal, { Carousel } from "components/CarouselModal"

type CarouselCardProps = {
  data: GetHomeQuery["adImages"]
}

const CarouselCard = ({ data }: CarouselCardProps) => {
  const { Column, HeaderCell, Cell } = Table

  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [prepareUpdate, setPrepareUpdate] = useState({
    id: "",
    index: 0,
    title: "",
    status: false,
    url: "",
    image: "",
  })

  const slides = useMemo(() => {
    if (!data?.edges) return []

    return data.edges?.map(card => ({
      index: card.node?.sort || 0,
      id: card.node?.id || "",
      title: card.node?.title || "",
      status: card.node?.status === true ? "開啟" : "關閉",
      url: card.node?.redirectType + "/" + card.node?.targetId,
      image: card.node?.image || "",
    }))
  }, [data])

  const [addAdImageMutation] = useAddAdImageMutation({ refetchQueries: ["GetHome"] })
  const [updateAdImageMutation] = useUpdateAdImageMutation({ refetchQueries: ["GetHome"] })
  const [deleteAdImageMutation] = useDeleteAdImageMutation({ refetchQueries: ["GetHome"] })

  const handleCreate = (carousel: Carousel) => {
    if (slides.length >= 10) {
      alert("超過10張輪播圖上限，請刪除掉，再做新增")
      return
    }
    addAdImageMutation({
      variables: {
        usageType: "首頁輪播",
        redirect: carousel.advancedOption,
        sort: 2,
        targetId: (carousel.advancedOption === "case" ? carousel.case : carousel.clinic) || "",
        image: carousel.image || "",
        status: false,
      },
    })
  }

  const handleUpdate = () => {
    console.log(prepareUpdate)
    updateAdImageMutation({
      variables: {
        id: prepareUpdate.id,
        usageType: "首頁輪播",
        title: prepareUpdate.title,
        redirect: "Clinic",
        sort: prepareUpdate.index,
        targetId: "clinic_id_xxx",
        status: prepareUpdate.status,
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
                          setPrepareUpdate({
                            id: rowData.id,
                            title: rowData.title,
                            status: rowData.status === "開啟" ? true : false,
                            url: rowData.url,
                            image: rowData.image,
                            index: rowData.index,
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
        onClose={() => setOpenAddModal(false)}
        onSubmit={handleCreate}
      />

      <CarouselModal
        type="edit"
        defaultCarousel={{
          title: prepareUpdate?.title,
          clinic: "12",
          sort: String(prepareUpdate?.index || ""),
          advancedOption: "clinic",
          image: prepareUpdate?.image,
          show: prepareUpdate?.status,
        }}
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSubmit={handleUpdate}
      />
    </>
  )
}

export default CarouselCard
