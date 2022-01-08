import { Flex, Spacer, UnorderedList } from '@chakra-ui/react'
import CustomListItem from './CustomListItem'
import NewPageModal from './NewPageModal'

const PageList = () => (
  <Flex border="1px solid #333" w="170px" direction="column" padding="10px">
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
)

export default PageList
