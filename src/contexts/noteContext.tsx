/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState, FC } from 'react'

type NoteContextProps = {
  noteId: string | undefined
  sectionId: string | undefined
  pageId: string | undefined
  setNoteId: (noteId: string | undefined) => void
  setSectionId: (sectionId: string | undefined) => void
  setPageId: (pageId: string | undefined) => void
}

const NoteContext = createContext<NoteContextProps>({
  noteId: undefined,
  sectionId: undefined,
  pageId: undefined,
  setNoteId: () => {},
  setSectionId: () => {},
  setPageId: () => {},
})

export const useNote = () => useContext(NoteContext)

export const NoteProvider: FC = ({ children }) => {
  const context = useNote()

  const [noteId, setNoteId] = useState(context.noteId)
  const [sectionId, setSectionId] = useState(context.sectionId)
  const [pageId, setPageId] = useState(context.pageId)

  const newContext: NoteContextProps = {
    noteId,
    sectionId,
    pageId,
    setNoteId,
    setSectionId,
    setPageId,
  }

  return (
    <NoteContext.Provider value={newContext}>{children}</NoteContext.Provider>
  )
}
