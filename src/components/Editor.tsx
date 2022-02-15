import { useEffect, useRef } from 'react'
import { useNote } from 'contexts/noteContext'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { defaultMarkdownParser } from 'prosemirror-markdown'
import applyDevTools from 'prosemirror-dev-tools'
import pmPlugins from 'lib/pmPlugins'
import schema from 'lib/pmSchema'
import { Button } from '@chakra-ui/react'

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

  return (
    <div>
      <Button colorScheme="green" mb={2}>
        保存
      </Button>
      <div ref={pmEditor} />
    </div>
  )
}

export default Editor
