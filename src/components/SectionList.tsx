import { Flex, Spacer, UnorderedList } from '@chakra-ui/react'
import { ISection } from 'models'
import CustomListItem from './CustomListItem'
import NewSectionModal from './NewSectionModal'

const sections: ISection[] = [
  {
    name: 'セクション名１',
    note_id: 'note_id1',
    createdAt: new Date(),
    id: 'section_id1',
  },
  {
    name: 'セクション名２',
    note_id: 'note_id1',
    createdAt: new Date(),
    id: 'section_id2',
  },
  {
    name: 'セクション名３',
    note_id: 'note_id1',
    createdAt: new Date(),
    id: 'section_id3',
  },
]

const SectionList = () => (
  <Flex border="1px solid #333" w="170px" direction="column" padding="10px">
    <UnorderedList listStyleType="none" margin="0">
      {sections.map((section: ISection) => (
        <CustomListItem key={section.id}>{section.name}</CustomListItem>
      ))}
    </UnorderedList>
    <Spacer />
    <NewSectionModal />
  </Flex>
)

export default SectionList
