import { Flex, Spacer, UnorderedList } from '@chakra-ui/react'
import { getSections } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { ISection } from 'models'
import { useEffect, useState } from 'react'
import CustomListItem from './CustomListItem'
import NewSectionModal from './NewSectionModal'

const SectionList = () => {
  const [sections, setSections] = useState<ISection[]>([])
  const { noteId, setSectionId } = useNote()

  useEffect(() => {
    const f = async () => {
      if (noteId) {
        const data = await getSections(noteId)
        setSections(data)
      }
    }

    if (noteId !== undefined) {
      f().catch((e) => console.log(e))
    }
  }, [noteId])

  const clickSection = (sectionId: string | undefined) => {
    setSectionId(sectionId)
  }

  return (
    <Flex border="1px solid #333" w="170px" direction="column" padding="10px">
      <UnorderedList listStyleType="none" margin="0">
        {sections.map((section: ISection) => (
          <CustomListItem
            key={section.id}
            onClick={() => clickSection(section.id)}
          >
            {section.name}
          </CustomListItem>
        ))}
      </UnorderedList>
      <Spacer />
      <NewSectionModal />
    </Flex>
  )
}

export default SectionList
