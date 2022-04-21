import { useState } from 'react'
import Button from "components/Button"
import Card from "components/Card"
import CarouselPreview from "components/CarouselPreview"
import ClinicTable from "./ClinicTable"
import Modal from "components/Modal"
import Form from "components/Form"
import Layout from "components/Layout"
import ImageUploading from "react-images-uploading"
import { ImageListType } from "react-images-uploading/dist/typings"
import styled from "./CosmeticClinic.module.scss"
import Icon from 'components/Icon'

const MAX_NUMBER = 5

const CosmeticClinic = () => {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<ImageListType>([])

  return (
    <>
      <Layout.Breadcrumbs>
        <Layout.Breadcrumbs.Item>診所</Layout.Breadcrumbs.Item>
      </Layout.Breadcrumbs>
      <Card>
        <Card.Header title="輪播" />
        <Card.Body>
          <CarouselPreview />
        </Card.Body>
      </Card>
      <div>
        <ImageUploading
          multiple
          value={images}
          onChange={(imageList: ImageListType) => setImages(imageList)}
          maxNumber={MAX_NUMBER}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            dragProps,
          }) => (
            <div
              className={styled["filepond-wrapper"]}
              onClick={onImageUpload}
              {...dragProps}
            >
              <div className={styled["drag-area"]}>
                Drag / Drop your files or Browser
              </div>
              {imageList.length > 0 && (<div className={styled["items-wrapper"]}>
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className={styled["image-item"]}
                    onClick={e => {
                      e.stopPropagation()
                      onImageUpdate(index)
                    }}
                  >
                    <img src={image["data_url"]} alt="" />
                    <button
                      className={styled.remove}
                      onClick={e => {
                        e.stopPropagation()
                        onImageRemove(index)
                      }}>
                      <Icon name="cross" />
                    </button>
                    <div
                      className={styled.upload}
                      onClick={e => {
                        e.stopPropagation()
                      }}
                    >
                      Upload
                    </div>
                  </div>
                ))}
              </div>)}
            </div>
          )}
        </ImageUploading>
      </div>
      <Card>
        <Card.Header title="診所" >
          <Button variant="secondary" onClick={() => setOpen(true)}>新增診所</Button>
          <Modal
            title="新增診所"
            open={open}
            confirmText="建立"
            cancelText="取消"
            onClose={() => setOpen(false)}
          >
            <Form>
              <Form.Group layout="vertical">
                <Form.Label required>診所名稱</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>大小分類</Form.Label>
                <Form.Checkbox>小分類1</Form.Checkbox>
                <Form.Checkbox>小分類2</Form.Checkbox>
                <Form.Checkbox>小分類3</Form.Checkbox>
                <Form.Checkbox>小分類4</Form.Checkbox>
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>診所介紹</Form.Label>
                <Form.Textarea style={{ height: "100px" }} />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>完整地址</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>診所網址</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
              <Form.Group layout="vertical">
                <Form.Label required>診所電話</Form.Label>
                <Form.Input type="text" />
              </Form.Group>
            </Form>
          </Modal>
        </Card.Header>
        <Card.Body>
          <ClinicTable />
        </Card.Body>
      </Card>
    </>
  )
}

export default CosmeticClinic