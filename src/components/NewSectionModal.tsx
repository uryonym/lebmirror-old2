import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { addSection } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { ISection } from 'models'
import { ChangeEvent, useState } from 'react'
import { useModal } from 'react-hooks-use-modal'

const NewSectionModal = () => {
  const [sectionName, setSectionName] = useState<string>('')
  const [Modal, open, close] = useModal('root')
  const { noteId } = useNote()
  const isEmptyNote: boolean = noteId === undefined

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSectionName(e.target.value)
  }

  const clickCreateSection = async () => {
    close()
    const data: ISection = {
      name: sectionName,
      noteId: noteId!,
      createdAt: undefined,
      id: undefined,
    }
    await addSection(data).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div className="new-section">
      <Button onClick={open}>セクション作成</Button>
      <Modal>
        <Box className="basic-modal">
          <Typography variant="h3">新規セクションの作成</Typography>
          {isEmptyNote ? (
            <p>ノートを選択してください。</p>
          ) : (
            <div>
              <TextField variant="standard" type="text" placeholder="セクション名を入力" value={sectionName} onChange={handleChange} />
            </div>
          )}
          <Button variant="contained" onClick={clickCreateSection} disabled={isEmptyNote}>
            作成
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default NewSectionModal
