import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { noteSelector } from 'features/note/noteSlice'
import { createSection, ISection } from 'features/section/sectionSlice'
import { ChangeEvent, useState } from 'react'

const NewSectionModal = () => {
  const [sectionName, setSectionName] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const { currentNote } = useAppSelector(noteSelector)
  const dispatch = useAppDispatch()
  const isEmptyNote: boolean = currentNote === undefined

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSectionName(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const clickCreateSection = () => {
    const data: ISection = {
      name: sectionName,
      noteId: currentNote!.id!,
      createdAt: new Date(),
      id: undefined,
    }
    dispatch(createSection(data)).catch((e) => {
      console.log(e)
    })
    handleClose()
  }

  return (
    <>
      <Button fullWidth onClick={handleClickOpen}>
        セクション作成
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新規セクションの作成</DialogTitle>
        <DialogContent>
          {isEmptyNote ? (
            <DialogContentText>ノートを選択してください。</DialogContentText>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              variant="standard"
              type="text"
              placeholder="セクション名を入力"
              value={sectionName}
              onChange={handleChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={clickCreateSection} disabled={isEmptyNote}>
            作成
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewSectionModal
