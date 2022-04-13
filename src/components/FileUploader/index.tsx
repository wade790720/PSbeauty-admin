import { useState } from "react";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePond, registerPlugin } from "react-filepond";
import { FilePondFile } from "filepond";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export interface InformationFilepondProps {
  name: string;
  putEP: string;
  onLoad?: (response: any) => string;
  onUpdateFiles?: (files: FilePondFile[]) => void;
}

const FileUploader = ({
  name,
  putEP,
  onLoad,
  onUpdateFiles,
}: InformationFilepondProps) => {
  const [files, setFiles] = useState([])
  return (
    <div className="uploader">
      <FilePond
        className="filepond-entregableuploader"
        onupdatefiles={onUpdateFiles}
        name={name}
        labelIdle={`Sube tus archivos<br /><span class="filepond--label-action">O búscalos</span>`}
        server={{
          url: process.env.REACT_APP_API_URL,
          process: {
            url: putEP,
            method: 'PUT',
            headers: { Authorization: `Bearer OOXX` },
            onerror: (error) => console.log({ error }),
            onload: onLoad,
          },
        }}
      />
    </div>
  )
}

export default FileUploader