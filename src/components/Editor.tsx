import { useEffect, useRef } from 'react'
import { useNote } from 'contexts/noteContext'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown'
import applyDevTools from 'prosemirror-dev-tools'
import pmPlugins from 'lib/pmPlugins'
import schema from 'lib/pmSchema'
import firestoreApi from 'api/firestoreApi'
import { Button, Stack } from '@mui/material'
import { css } from '@emotion/react'

const Editor = () => {
  const { pageId, content } = useNote()

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
      eView.current = new EditorView(ele, {
        state,
        dispatchTransaction(transaction) {
          if (eView.current) {
            const newState = eView.current.state.apply(transaction)
            eView.current.updateState(newState)
          }
        },
      })
    }
  }

  useEffect(() => {
    createEditorView(pmEditor.current)
    if (eView.current) {
      applyDevTools(eView.current)
    }
    return () => eView.current?.destroy()
  }, [])

  useEffect(() => {
    if (content) {
      const state = createEditorState(content)
      if (eView.current) {
        eView.current.updateState(state)
      }
    }
  }, [content])

  const clickSave = async () => {
    if (pageId && eView.current) {
      await firestoreApi.updatePageContent(pageId, defaultMarkdownSerializer.serialize(eView.current.state.doc))
    }
  }

  const clickOutputMarkdown = () => {
    if (eView.current) {
      console.log(defaultMarkdownSerializer.serialize(eView.current.state.doc))
    }
  }

  const controlStyle = css`
    padding: 8px;
    border-bottom: 1px solid #ccc;
  `

  return (
    <div className="editor">
      <Stack css={controlStyle} spacing={2} direction="row">
        <Button variant="contained" onClick={clickSave}>
          保存
        </Button>
        <Button variant="contained" onClick={clickOutputMarkdown}>
          Markdown出力
        </Button>
      </Stack>
      <div className="editor-content" ref={pmEditor} />
    </div>
  )
}

export default Editor
