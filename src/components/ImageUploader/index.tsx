import { useState } from "react"
import { Uploader } from "rsuite"
import { FileType } from "rsuite/Uploader"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"
import { storage } from "../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import uuid from "utils/uuid"

type ImageUploaderProps = {
  listType?: "picture" | "text" | "picture-text" | undefined
  disabled?: boolean
  fileList?: FileType[]
  defaultFileList?: FileType[]
  onChange?: (url: string[]) => void
  // onUpload
  imageLength?: number
  renderFileInfo?: (file: FileType, fileElement: React.ReactNode) => React.ReactNode
}

const ImageUploader = (props: ImageUploaderProps) => {
  const [urlList, setUrlList] = useState<string[]>([])

  return (
    <Uploader
      listType={props.listType || "picture"}
      action=""
      autoUpload={false}
      disabled={props.disabled || urlList.length > (props.imageLength || 0)}
      defaultFileList={props.defaultFileList}
      renderFileInfo={props.renderFileInfo}
      shouldQueueUpdate={(fileList: FileType[], newFile: FileType[] | FileType) => {
        if (Array.isArray(newFile)) {
          const newRef = ref(storage, `image/${uuid()}/${newFile[0].name || ""}`)
          const uploadTask = uploadBytesResumable(newRef, newFile[0].blobFile as Blob)
          uploadTask.on(
            "state_changed",
            snapshot => {
              console.log(snapshot.bytesTransferred)
            },
            err => console.log(err),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(url => {
                const newUrlList = [...urlList, url]
                setUrlList(newUrlList)
                props.onChange && props.onChange(newUrlList)
              })
            },
          )
        }
        return true
      }}
      onRemove={(file: FileType) => {
        const newUrlList = urlList.filter(url => {
          return file.name && url.includes(file.name) ? false : true
        })
        setUrlList(newUrlList)
        props.onChange && props.onChange(newUrlList)
      }}>
      <button>
        <CameraRetro />
      </button>
    </Uploader>
  )
}

export default ImageUploader
