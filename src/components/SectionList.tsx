import { Flex, Spacer, UnorderedList } from '@chakra-ui/react'
import CustomListItem from './CustomListItem'
import NewSectionModal from './NewSectionModal'

const SectionList = () => (
  <Flex border="1px solid #333" w="170px" direction="column" padding="10px">
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
)

export default SectionList
