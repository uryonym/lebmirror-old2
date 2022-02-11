import { useEffect, useRef } from 'react'
import { useNote } from 'contexts/noteContext'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from 'prosemirror-schema-basic'

const Editor = () => {
  const { content } = useNote()

  const pmEditor = useRef<HTMLDivElement>(null)
  const eView = useRef<EditorView | null>(null)

  const createEditorView = (ele: HTMLDivElement | null) => {
    if (ele) {
      const state = EditorState.create({ schema })
      eView.current = new EditorView(ele, { state })
    }
  }

  useEffect(() => {
    createEditorView(pmEditor.current)
    return () => eView.current?.destroy()
  })

  useEffect(() => {
    if (content) {
      if (pmEditor.current) {
        const state = EditorState.create({ schema })
        eView.current = new EditorView(pmEditor.current, { state })
      }
    }
    return () => eView.current?.destroy()
  }, [content])

  return (
    <div>
      {content ? <div ref={pmEditor} /> : <p>ページを選択してください。</p>}
    </div>
  )
}

export default Editor
