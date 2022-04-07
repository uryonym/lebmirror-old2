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
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { noteSelector } from 'features/note/noteSlice'
import { deleteSection, fetchAllSections, ISection, sectionSelector, setCurrentSection, updateSection } from 'features/section/sectionSlice'
import { ContextState } from 'lib/constant'
import { useEffect, useState, MouseEvent, ChangeEvent } from 'react'
import NewSectionModal from './NewSectionModal'

const SectionList = () => {
  const [contextMenu, setContextMenu] = useState<ContextState | null>(null)
  const [sectionName, setSectionName] = useState<string>('')
  const [renameSectionId, setRenameSectionId] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const { sections } = useAppSelector(sectionSelector)
  const { currentNote } = useAppSelector(noteSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentNote) {
      dispatch(fetchAllSections(currentNote.id!)).catch((e) => console.log(e))
    }
  }, [currentNote])

  const handleClickSection = (sectionId: string | undefined) => {
    if (sectionId) {
      dispatch(setCurrentSection(sectionId))
    }
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

  const handleDeleteSection = () => {
    const sectionId = contextMenu?.value
    handleContextClose()
    if (sectionId) {
      dispatch(deleteSection(sectionId)).catch((e) => console.log(e))
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

  const handleRenameSection = () => {
    const section = sections.find((s) => s.id === renameSectionId)
    if (section) {
      const renameSection: ISection = { ...section, name: sectionName }
      dispatch(updateSection(renameSection)).catch((e) => console.log(e))
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
