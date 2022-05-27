import { useState, useRef } from "react"
import cx from "classnames"
import Icon from 'components/Icon'
import ImageUploading from "react-images-uploading"
import { ImageListType } from "react-images-uploading/dist/typings"
import styled from "./AdvertisementTable.module.scss"
import { ReactComponent as Remove } from "./Remove.svg"
import { ReactComponent as Edit } from "./Edit.svg"
import { ReactComponent as DefaultPhoto } from "./DefaultPhoto.svg"

import Modal from "components/Modal"
import Editor from "components/Editor"

const AdvertisementTable = () => {
  const [open, setOpen] = useState(false)
  const editorRef = useRef(null)
  const [images, setImages] = useState<ImageListType>([])
  const [formPhoto, setFormPhoto] = useState('')
  const [formTitle, setFormTitle] = useState('全新臉部拉提計畫')
  const [formContent, setFormContent] = useState('使用說明說明書，或稱作使用手冊，是產品製造者介紹產品的內容、指導用戶使用它的產品而編寫的，又或是向讀者、用戶、觀眾介紹某種讀物、或戲曲、電影的事故情節，演員陣容等的文字材料。')

  return (
    <div className={styled.wrapper}>
      <table>
        <thead>
          <tr>
            <th>圖片</th>
            <th>標題</th>
            <th>創建時間</th>
            <th>動作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {!formPhoto
                ? <DefaultPhoto className={styled.photo} />
                : <img className={styled.photo} src={formPhoto} />}
            </td>
            <td>
              <span className={cx("text-gray-800 fw-bold d-block fs-7", styled.title)}>
                {formTitle}
              </span>
              <div className={cx("text-gray-800 d-block fs-7", styled.ellipsis)} dangerouslySetInnerHTML={{ __html: formContent }}>
              </div>
            </td>
            <td>
              <span className="text-gray-800 d-block fs-7">2022-04-18</span>
            </td>
            <td className="text-start">
              <div className="btn btn-icon btn-bg-light btn-active-primary btn-sm" onClick={() => setOpen(true)}>
                <div className="svg-icon">
                  <Edit />
                  {/* <Edit onClick={() => setEditing(true)} /> */}
                </div>
              </div>
              <div className="btn btn-icon btn-bg-light btn-active-primary btn-sm">
                <div className="svg-icon">
                  <Remove />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal
        title="新增診所"
        open={open}
        confirmText="建立"
        cancelText="取消"
        onConfirm={() => {
          if (editorRef.current) {
            setFormPhoto(images[0]?.data_url);
            // setFormContent(editorRef.current.getContent());
          }
        }}
        onClose={() => setOpen(false)}
      >
        <Modal.Body className={styled.modal}>
          <ImageUploading
            value={images}
            onChange={(imageList: ImageListType) => setImages(imageList)}
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
              >
                {!imageList.length && <div className={styled["drag-area"]} onClick={onImageUpload}
                  {...dragProps}>
                    Drag / Drop your files or Browser
                </div>}
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
          <Editor/>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AdvertisementTable
