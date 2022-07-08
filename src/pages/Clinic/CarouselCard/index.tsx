import { useState, useMemo } from "react"
import { Table } from "rsuite"
import Button, { LinkButton } from "components/Button"
import Card from "components/Card"
import CarouselModal from "components/CarouselModal"
import { GetClinicQuery } from "../Clinic.graphql.generated"

type CarouselCardProps = {
  data: GetClinicQuery["adImages"]
}

const { Column, HeaderCell, Cell } = Table
const CarouselCard = ({ data }: CarouselCardProps) => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const slides = useMemo(() => {
    if (!data?.edges) return []

    return data?.edges?.map(card => ({
      index: card.node?.sort || 0,
      id: card.node?.id || "",
      status: card.node?.status === true ? "開啟" : "關閉",
      url: card.node?.redirectType + "/" + card.node?.targetId,
      image: card.node?.image || "",
    }))
  }, [data?.edges])

  const handleCreate = () => {
    if (slides.length >= 10) {
      alert("超過10張輪播圖上限，請刪除掉，再做新增")
      return
    }
  }

  const handleUpdate = () => {
    console.log("handleUpdate")
  }

  const handleDelete = (id: string) => {
    const ask = confirm("確定要刪除嗎?")
    if (ask) console.log("handleDelete")
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
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSubmit={handleUpdate}
      />
    </>
  )
}

export default CarouselCard
