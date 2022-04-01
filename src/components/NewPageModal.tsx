import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import firestoreApi from 'api/firestoreApi'
import { useNote } from 'contexts/noteContext'
import { IPage } from 'models'
import { ChangeEvent, useState } from 'react'

const NewPageModal = () => {
  const [pageName, setPageName] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const { sectionId } = useNote()
  const isEmptySection: boolean = sectionId === undefined

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPageName(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const clickCreatePage = async () => {
    handleClose()
    const data: IPage = {
      name: pageName,
      content: '',
      sectionId: sectionId!,
      createdAt: undefined,
      id: undefined,
    }
    await firestoreApi.addPage(data).catch((e) => {
      console.log(e)
    })
  }

  return (
    <>
      <Button fullWidth onClick={handleClickOpen}>
        ページ作成
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新規ページの作成</DialogTitle>
        <DialogContent>
          {isEmptySection ? (
            <DialogContentText>セクションを選択してください。</DialogContentText>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              variant="standard"
              type="text"
              placeholder="ページ名を入力"
              value={pageName}
              onChange={handleChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={clickCreatePage} disabled={isEmptySection}>
            作成
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewPageModal
