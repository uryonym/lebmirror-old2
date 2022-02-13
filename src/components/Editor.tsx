import { useEffect, useRef } from 'react'
import { useNote } from 'contexts/noteContext'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { defaultMarkdownParser } from 'prosemirror-markdown'
import pmPlugins from 'lib/pmPlugins'
import schema from 'lib/pmSchema'

const Editor = () => {
  const { content } = useNote()

  const pmEditor = useRef<HTMLDivElement>(null)
  const eView = useRef<EditorView | null>(null)

  const createEditorState = (bodyContent?: string): EditorState => {
    const doc = defaultMarkdownParser.parse(bodyContent || '')
    const plugins = pmPlugins()
    return EditorState.create({
      schema,
      doc,
      plugins,
    })
  }

  const createEditorView = (ele: HTMLDivElement | null) => {
    if (ele) {
      const state = createEditorState()
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
        const state = createEditorState(content)
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
