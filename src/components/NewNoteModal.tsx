import { useAuth } from 'contexts/authContext'
import { ChangeEvent, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { createNote, INote } from 'features/note/noteSlice'
import { useAppDispatch } from 'app/hooks'

const NewNoteModal = () => {
  const { user } = useAuth()
  const [noteName, setNoteName] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteName(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const clickCreateNote = () => {
    const data: INote = {
      name: noteName,
      uid: user?.uid ?? '',
      createdAt: new Date(),
      id: undefined,
    }
    dispatch(createNote(data)).catch((e) => {
      console.log(e)
    })
    handleClose()
  }

  return (
    <>
      <Button onClick={handleClickOpen}>ノート作成</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新規ノートの作成</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            variant="standard"
            type="text"
            placeholder="ノート名を入力"
            value={noteName}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clickCreateNote}>作成</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewNoteModal
