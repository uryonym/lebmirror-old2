import {
  Button,
  Flex,
  Heading,
  Spacer,
  Textarea,
  UnorderedList,
} from '@chakra-ui/react'
import CustomListItem from './components/CustomListItem'

const App = () => (
  <Flex direction="column">
    <Flex border="1px solid #333" h="45px" alignItems="center" paddingX="10px">
      <Heading>lebmirror</Heading>
      <Spacer />
      <Button colorScheme="blue" size="sm">
        ログイン
      </Button>
    </Flex>
    <Flex className="main">
      <Flex border="1px solid #333" w="170px" direction="column" padding="10px">
        <UnorderedList listStyleType="none" margin="0">
          <CustomListItem>section list 1</CustomListItem>
          <CustomListItem>section list 2</CustomListItem>
          <CustomListItem>section list 3</CustomListItem>
          <CustomListItem>section list 4</CustomListItem>
          <CustomListItem>section list 5</CustomListItem>
        </UnorderedList>
        <Spacer />
        <Button colorScheme="blue">セクション作成</Button>
      </Flex>
      <Flex border="1px solid #333" w="170px" direction="column" padding="10px">
        <UnorderedList listStyleType="none" margin="0">
          <CustomListItem>page list 1</CustomListItem>
          <CustomListItem>page list 2</CustomListItem>
          <CustomListItem>page list 3</CustomListItem>
          <CustomListItem>page list 4</CustomListItem>
          <CustomListItem>page list 5</CustomListItem>
        </UnorderedList>
        <Spacer />
        <Button colorScheme="blue">ページ作成</Button>
      </Flex>
      <Flex flex="1" border="1px solid #333" direction="column" padding="10px">
        <Heading as="h3" marginBottom="10px">
          タイトル
        </Heading>
        <Textarea flex="1" />
      </Flex>
    </Flex>
  </Flex>
)

export default App
