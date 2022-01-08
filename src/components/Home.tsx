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
import SectionList from './SectionList'
import PageList from './PageList'
import NewNoteModal from './NewNoteModal'

const user1: IUser = {
  displayName: 'yoneyama ryo',
  email: 'uryonym@gmail.com',
  uid: 'user_id1',
}

const notes: INote[] = [
  {
    name: 'ノート名１',
    uid: 'user_id1',
    createdAt: new Date(),
    id: 'note_id1',
  },
  {
    name: 'ノート名２',
    uid: 'user_id1',
    createdAt: new Date(),
    id: 'note_id2',
  },
  {
    name: 'ノート名３',
    uid: 'user_id1',
    createdAt: new Date(),
    id: 'note_id3',
  },
]

const Home = () => {
  const clickSignOut = async () => {
    await signOut(fbAuth)
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
        <Select placholder="ノートを選択" width="200px">
          {notes.map((note: INote) => (
            <option value={note.id}>{note.name}</option>
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
