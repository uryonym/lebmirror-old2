import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Select,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { fbAuth } from 'firebaseConfig'
import { INote, IUser } from 'models'
import { signOut } from 'firebase/auth'
import { ChangeEvent, useState } from 'react'
import { getNotes } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import SectionList from './SectionList'
import PageList from './PageList'
import NewNoteModal from './NewNoteModal'

const user1: IUser = {
  displayName: 'yoneyama ryo',
  email: 'uryonym@gmail.com',
  uid: 'user_id1',
}

const Home = () => {
  const [notes, setNotes] = useState<INote[]>()
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
    <>
      <Flex
        border="1px solid #333"
        h="45px"
        alignItems="center"
        paddingX="10px"
      >
        <Heading>lebmirror</Heading>
        <Button colorScheme="blue" onClick={clickGetNotes}>
          ノート一覧取得
        </Button>
        <Select
          placeholder="ノートを選択"
          width="200px"
          onChange={handleChangeNote}
        >
          {notes &&
            notes.map((note: INote) => (
              <option key={note.id} value={note.id}>
                {note.name}
              </option>
            ))}
        </Select>
        <NewNoteModal />
        <Spacer />
        <Text marginEnd="10px">{user1.displayName}</Text>
        <Button colorScheme="red" size="sm" onClick={clickSignOut}>
          サインアウト
        </Button>
      </Flex>
      <Flex className="main">
        <SectionList />
        <PageList />
        <Flex
          flex="1"
          border="1px solid #333"
          direction="column"
          padding="10px"
        >
          <Heading as="h3" marginBottom="10px">
            タイトル
          </Heading>
          <Editable flex="1" defaultValue="テキストテスト">
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Flex>
      </Flex>
    </>
  )
}

export default Home
