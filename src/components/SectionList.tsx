import { Flex, Spacer, UnorderedList } from '@chakra-ui/react'
import { INote, ISection, IUser } from 'models'
import CustomListItem from './CustomListItem'
import NewSectionModal from './NewSectionModal'

const user1: IUser = {
  displayName: 'yoneyama ryo',
  email: 'uryonym@gmail.com',
}
const note1: INote = {
  name: 'ノート１',
  user: user1,
  createdAt: new Date(),
  id: 'note_id1',
}
const section: ISection = {
  name: 'セクション名１',
  note: note1,
  createdAt: new Date(),
  id: 'section_id1',
}

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
