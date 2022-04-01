import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material'
import firestoreApi from 'api/firestoreApi'
import { useAppSelector } from 'app/hooks'
import { useNote } from 'contexts/noteContext'
import { noteSelector } from 'features/note/noteSlice'
import { ContextState } from 'lib/constant'
import { ISection } from 'models'
import { useEffect, useState, MouseEvent, ChangeEvent } from 'react'
import NewSectionModal from './NewSectionModal'

const SectionList = () => {
  const [sections, setSections] = useState<ISection[]>([])
  const [contextMenu, setContextMenu] = useState<ContextState | null>(null)
  const [sectionName, setSectionName] = useState<string>('')
  const [renameSectionId, setRenameSectionId] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const { setSectionId } = useNote()
  const { currentNote } = useAppSelector(noteSelector)

  useEffect(() => {
    if (currentNote) {
      const f = async () => {
        const data = await firestoreApi.getSections(currentNote.id!)
        setSections(data)
      }

      f().catch((e) => console.log(e))
    }
  }, [currentNote])

  const handleClickSection = (sectionId: string | undefined) => {
    setSectionId(sectionId)
  }

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>, sectionId: string | undefined) => {
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
            value: sectionId,
          }
        : null
    )
  }

  const handleContextClose = () => {
    setContextMenu(null)
  }

  const handleDeleteSection = async () => {
    const sectionId = contextMenu?.value
    handleContextClose()
    if (sectionId) {
      await firestoreApi.deleteSection(sectionId).catch((e) => {
        console.log(e)
      })
      setSections(sections.filter((s) => s.id !== sectionId))
    }
  }

  const handleModalOpen = () => {
    const sectionId = contextMenu?.value
    handleContextClose()
    setOpen(true)
    if (sectionId) {
      setRenameSectionId(sectionId)
      const section = sections.find((x) => x.id === sectionId)
      if (section) {
        setSectionName(section.name)
      }
    }
  }

  const handleModalClose = () => {
    setRenameSectionId('')
    setOpen(false)
  }

  const handleChangeSectionName = (e: ChangeEvent<HTMLInputElement>) => {
    setSectionName(e.target.value)
  }

  const handleRenameSection = async () => {
    const data: ISection = {
      name: sectionName,
      noteId: currentNote!.id!,
      createdAt: undefined,
      id: renameSectionId,
    }
    await firestoreApi.updateSection(data).catch((e) => {
      console.log(e)
    })
    const section = sections.find((x) => x.id === renameSectionId)
    if (section) {
      section.name = sectionName
      setSections(sections)
    }
    handleModalClose()
  }

  return (
    <div className="section-list">
      <div className="section-list-item">
        <List>
          {sections.map((section: ISection) => (
            <ListItem key={section.id} divider disablePadding>
              <ListItemButton onClick={() => handleClickSection(section.id)} onContextMenu={(e) => handleContextMenu(e, section.id)}>
                <ListItemText primary={section.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <Menu
        open={contextMenu !== null}
        onClose={handleContextClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        <MenuItem onClick={handleModalOpen}>名前変更</MenuItem>
        <MenuItem onClick={handleDeleteSection}>削除</MenuItem>
      </Menu>
      <NewSectionModal />
      <Dialog open={open} onClose={handleModalClose}>
        <DialogTitle>セクション名の変更</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            variant="standard"
            type="text"
            placeholder="セクション名を入力"
            value={sectionName}
            onChange={handleChangeSectionName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenameSection}>変更</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SectionList
