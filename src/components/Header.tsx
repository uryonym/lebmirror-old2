import { fbAuth } from 'firebaseConfig'
import { INote } from 'models'
import { signOut } from 'firebase/auth'
import { ChangeEvent, useState } from 'react'
import { getNotes } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { useAuth } from 'contexts/authContext'
import { Button } from '@mui/material'
import NewNoteModal from './NewNoteModal'

const Header = () => {
  const { user } = useAuth()
  const [notes, setNotes] = useState<INote[]>([])
  const { setNoteId } = useNote()

  const clickGetNotes = async () => {
    const data = await getNotes()
    setNotes(data)
  }

  const clickSignOut = async () => {
    await signOut(fbAuth)
  }

  const handleChangeNote = (e: ChangeEvent<HTMLSelectElement>) => {
    setNoteId(!e.target.value ? undefined : e.target.value)
  }

  return (
    <div className="header">
      <h2>lebmirror</h2>
      <Button onClick={clickGetNotes}>ノート一覧取得</Button>
      <select onChange={handleChangeNote}>
        <option hidden>ノートを選択</option>
        {notes.map((note: INote) => (
          <option key={note.id} value={note.id}>
            {note.name}
          </option>
        ))}
      </select>
      <NewNoteModal />
      <div className="flex-spacer" />
      <p>{user?.displayName}</p>
      <Button onClick={clickSignOut}>サインアウト</Button>
    </div>
  )
}

export default Header
