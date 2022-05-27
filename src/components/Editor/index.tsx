import { useRef } from "react";
import { Editor as TinyMceReactEditor } from "@tinymce/tinymce-react"
import { Editor as TinyMCEEditor } from "tinymce"
import styled from "./Editor.module.scss"


const Editor = () => {
  const editorRef = useRef<TinyMCEEditor>()

  return (
    <div className={styled.wrapper}>
      <TinyMceReactEditor
        onInit={(_, editor) => { 
          editorRef.current = editor
         }}
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