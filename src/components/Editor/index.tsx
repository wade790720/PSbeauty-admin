import { useRef } from "react";
import { Editor as TinyMceReactEditor } from "@tinymce/tinymce-react"
import { Editor as TinyMCEEditor } from "tinymce"
import styled from "./Editor.module.scss"
import { EventHandler } from "@tinymce/tinymce-react/lib/cjs/main/ts/Events";
interface EditorProps {
  onEdit?: EventHandler<any>
  value?: string
}

const Editor = (props: EditorProps) => {
  const editorRef = useRef<TinyMCEEditor>()

  return (
    <div className={styled.wrapper}>
      <TinyMceReactEditor
        onInit={(_, editor) => {
          editorRef.current = editor
        }}
        onEditorChange={props.onEdit}
        tinymceScriptSrc="/js/tinymce/tinymce.min.js"
        init={{
          width: '100%',
          height: 250,
          menubar: false,
          plugins: 'code geo-image',
          toolbar: "undo redo | formatselect | " +
            "forecolor bold italic fontsize | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat",
          toolbar_mode: 'sliding',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  );
}

export default Editor