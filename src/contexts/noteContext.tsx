/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState, FC } from 'react'

type NoteContextProps = {
  noteId: string | undefined
  sectionId: string | undefined
  pageId: string | undefined
  content: string | undefined
  setNoteId: (noteId: string | undefined) => void
  setSectionId: (sectionId: string | undefined) => void
  setPageId: (pageId: string | undefined) => void
  setContent: (content: string | undefined) => void
}

const NoteContext = createContext<NoteContextProps>({
  noteId: undefined,
  sectionId: undefined,
  pageId: undefined,
  content: undefined,
  setNoteId: () => {},
  setSectionId: () => {},
  setPageId: () => {},
  setContent: () => {},
})

export const useNote = () => useContext(NoteContext)

export const NoteProvider: FC = ({ children }) => {
  const context = useNote()

  const [noteId, setNoteId] = useState(context.noteId)
  const [sectionId, setSectionId] = useState(context.sectionId)
  const [pageId, setPageId] = useState(context.pageId)
  const [content, setContent] = useState(context.content)

  const newContext: NoteContextProps = {
    noteId,
    sectionId,
    pageId,
    content,
    setNoteId,
    setSectionId,
    setPageId,
    setContent,
  }

  return (
    <NoteContext.Provider value={newContext}>{children}</NoteContext.Provider>
  )
}
