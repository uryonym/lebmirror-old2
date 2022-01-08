import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react'
import { getFirebaseAuth } from 'firebaseConfig'
import SectionList from './SectionList'
import PageList from './PageList'

const Home = () => {
  const auth = getFirebaseAuth()

  const clickSignOut = async () => {
    await auth.signOut()
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
        <Spacer />
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
