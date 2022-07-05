import { useState } from "react"
import { Uploader } from "rsuite"
import { FileType } from "rsuite/Uploader"
import CameraRetro from "@rsuite/icons/legacy/CameraRetro"
import { storage } from "../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import uuid from "utils/uuid"

type ImageUploaderProps = {
  disabled?: boolean
  fileList?: FileType[]
  defaultFileList?: FileType[]
  onChange?: (url: string) => void
  imageLength?: number
}

const ImageUploader = (props: ImageUploaderProps) => {
  const [fileList, setFileList] = useState<FileType[]>([])

  const onChangeUploader = (fileList: FileType[]) => {
    const fileToUpload = fileList[0].blobFile
    const fileName = fileList[0].name || ""
    const newRef = ref(storage, `image/${uuid()}/${fileName}`)
    const uploadTask = uploadBytesResumable(newRef, fileToUpload as Blob)

    setFileList(fileList)

    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log(snapshot.bytesTransferred)
      },
      err => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          console.log(url)
          props.onChange && props.onChange(url)
        })
      },
    )
  }
  return (
    <Uploader
      listType="picture"
      action=""
      autoUpload={false}
      disabled={fileList.length > (props.imageLength || 0)}
      defaultFileList={props.defaultFileList}
      fileList={fileList}
      onChange={onChangeUploader}>
      <button>
        <CameraRetro />
      </button>
    </Uploader>
  )
}

export default ImageUploader
