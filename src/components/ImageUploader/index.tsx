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
}

const ImageUploader = (props: ImageUploaderProps) => {
  const onChangeUploader = (fileList: FileType[]) => {
    const fileToUpload = fileList[0].blobFile
    const fileName = fileList[0].name || ""
    const newRef = ref(storage, `image/${uuid()}/${fileName}`)
    const uploadTask = uploadBytesResumable(newRef, fileToUpload as Blob)

    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log(snapshot.bytesTransferred)
      },
      err => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          props.onChange && props.onChange(url)
          // setFileList(fileList)
          // setNewSlide({ ...newSlide, image: url + "" })
        })
      },
    )
  }
  return (
    <Uploader
      listType="picture"
      action=""
      disabled={props.disabled}
      defaultFileList={props.defaultFileList}
      fileList={props.fileList}
      onChange={onChangeUploader}>
      <button>
        <CameraRetro />
      </button>
    </Uploader>
  )
}

export default ImageUploader
