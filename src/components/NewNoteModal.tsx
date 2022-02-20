import { useModal } from 'react-hooks-use-modal'
import { addNote } from 'api/notesApi'
import { useAuth } from 'contexts/authContext'
import { INote } from 'models'
import { ChangeEvent, useState } from 'react'

const NewNoteModal = () => {
  const { user } = useAuth()
  const [noteName, setNoteName] = useState<string>('')
  const [Modal, open, close] = useModal('root')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteName(e.target.value)
  }

  const clickCreateNote = async () => {
    close()
    const data: INote = {
      name: noteName,
      uid: user?.uid ?? '',
      createdAt: undefined,
      id: undefined,
    }
    await addNote(data).catch((e) => {
      console.log(e)
    })
  }

  return (
    <>
      <button type="button" onClick={open}>
        ノート作成
      </button>
      <Modal>
        <div className="basic-modal">
          <h2>新規ノートの作成</h2>
          <input type="text" placeholder="ノート名を入力" value={noteName} onChange={handleChange} />
          <button type="button" onClick={clickCreateNote}>
            作成
          </button>
        </div>
      </Modal>
    </>
  )
}

export default NewNoteModal
