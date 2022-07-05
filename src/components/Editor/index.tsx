import { useRef } from "react"
import { Editor as TinyMCEEditor } from "tinymce"
import { Editor as TinyMceReactEditor } from "@tinymce/tinymce-react"
import styled from "./Editor.module.scss"
interface EditorProps {
  onEdit?: ((a: string, editor: TinyMCEEditor) => void) | undefined
  height?: number
  initialValue?: string
}

const Editor = (props: EditorProps) => {
  const editorRef = useRef<TinyMCEEditor>()

  return (
    <div className={styled.wrapper}>
      <TinyMceReactEditor
        initialValue={props.initialValue}
        onInit={(_, editor) => {
          editorRef.current = editor
        }}
        onEditorChange={props.onEdit}
        init={{
          width: "100%",
          height: props.height || 500,
          plugins: ["link image", "table paste"],
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  )
}

export default Editor
