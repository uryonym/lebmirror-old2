import { Divider, List, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material'
import { getSections } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { ContextState } from 'lib/constant'
import { ISection } from 'models'
import { useEffect, useState, MouseEvent } from 'react'
import NewSectionModal from './NewSectionModal'

const SectionList = () => {
  const [sections, setSections] = useState<ISection[]>([])
  const [contextMenu, setContextMenu] = useState<ContextState | null>(null)
  const { noteId, setSectionId } = useNote()

  useEffect(() => {
    if (noteId) {
      const f = async () => {
        const data = await getSections(noteId)
        setSections(data)
      }

      f().catch((e) => console.log(e))
    }
  }, [noteId])

  const clickSection = (sectionId: string | undefined) => {
    setSectionId(sectionId)
  }

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>, sectionId: string | undefined) => {
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
          }
        : null
    )
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  return (
    <div className="section-list">
      <div className="section-list-item">
        <List>
          {sections.map((section: ISection) => (
            <>
              <ListItemButton onClick={() => clickSection(section.id)} onContextMenu={(e) => handleContextMenu(e, section.id)}>
                <ListItemText primary={section.name} />
              </ListItemButton>
              <Divider component="li" />
            </>
          ))}
        </List>
      </div>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        <MenuItem onClick={handleClose}>名前変更</MenuItem>
        <MenuItem onClick={handleClose}>削除</MenuItem>
      </Menu>
      <NewSectionModal />
    </div>
  )
}

export default SectionList
