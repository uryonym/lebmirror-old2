import { fbAuth } from 'firebaseConfig'
import { signOut } from 'firebase/auth'
import { ChangeEvent } from 'react'
import { useAuth } from 'contexts/authContext'
import { Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { fetchAllNotes, noteSelector, setCurrentNote } from 'features/note/noteSlice'
import NewNoteModal from './NewNoteModal'

const Header = () => {
  const { user } = useAuth()
  const { notes } = useAppSelector(noteSelector)
  const dispatch = useAppDispatch()

  const clickGetNotes = () => {
    dispatch(fetchAllNotes()).catch((e) => console.log(e))
  }

  const clickSignOut = async () => {
    await signOut(fbAuth)
  }

  const handleChangeNote = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(setCurrentNote(e.target.value))
    }
  }

  return (
    <div className="header">
      <h2>lebmirror</h2>
      <Button onClick={clickGetNotes}>ノート一覧取得</Button>
      <select onChange={handleChangeNote}>
        <option hidden>ノートを選択</option>
        {notes.map((note) => (
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
