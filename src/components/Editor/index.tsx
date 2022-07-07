import { Editor as TinyMceReactEditor } from "@tinymce/tinymce-react"
import styled from "./Editor.module.scss"
import { useFormContext, useController } from "react-hook-form"

type EditorProps = {
  name: string
  height?: number
}

const Editor = ({ name, height }: EditorProps) => {
  const { control } = useFormContext<{ [name: string]: string }>()
  const {
    field: { onChange, ...field },
  } = useController({ control, name })

  return (
    <div className={styled.wrapper}>
      <TinyMceReactEditor
        {...field}
        onEditorChange={onChange}
        init={{
          width: "100%",
          height: height || 500,
          plugins: ["link image", "table paste"],
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  )
}

export default Editor
