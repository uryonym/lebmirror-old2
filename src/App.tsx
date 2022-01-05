import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Spacer,
  UnorderedList,
} from '@chakra-ui/react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from 'firebase/auth'
import CustomListItem from './components/CustomListItem'
import NewPageModal from './components/NewPageModal'
import NewSectionModal from './components/NewSectionModal'
import { useAuth } from './contexts/authContext'
import { getFirebaseAuth } from './firebase'

const App = () => {
  const { user } = useAuth()

  const clickLogin = async () => {
    const auth = getFirebaseAuth()
    const provider = new GoogleAuthProvider()
    const signInResult: UserCredential = await signInWithPopup(auth, provider)
    const currentUser: User = signInResult.user
    console.log(currentUser)
  }

  return (
    <Flex direction="column">
      <Flex
        border="1px solid #333"
        h="45px"
        alignItems="center"
        paddingX="10px"
      >
        <Heading>lebmirror</Heading>
        <Spacer />
        <Button colorScheme="blue" size="sm" onClick={clickLogin}>
          {user ? 'ログアウト' : 'ログイン'}
        </Button>
      </Flex>
      <Flex className="main">
        <Flex
          border="1px solid #333"
          w="170px"
          direction="column"
          padding="10px"
        >
          <UnorderedList listStyleType="none" margin="0">
            <CustomListItem>section list 1</CustomListItem>
            <CustomListItem>section list 2</CustomListItem>
            <CustomListItem>section list 3</CustomListItem>
            <CustomListItem>section list 4</CustomListItem>
            <CustomListItem>section list 5</CustomListItem>
          </UnorderedList>
          <Spacer />
          <NewSectionModal />
        </Flex>
        <Flex
          border="1px solid #333"
          w="170px"
          direction="column"
          padding="10px"
        >
          <UnorderedList listStyleType="none" margin="0">
            <CustomListItem>page list 1</CustomListItem>
            <CustomListItem>page list 2</CustomListItem>
            <CustomListItem>page list 3</CustomListItem>
            <CustomListItem>page list 4</CustomListItem>
            <CustomListItem>page list 5</CustomListItem>
          </UnorderedList>
          <Spacer />
          <NewPageModal />
        </Flex>
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
    </Flex>
  )
}

export default App
