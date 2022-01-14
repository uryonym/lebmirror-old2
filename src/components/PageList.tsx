import { Flex, Spacer, UnorderedList } from '@chakra-ui/react'
import { getPages } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { IPage } from 'models'
import { useEffect, useState } from 'react'
import CustomListItem from './CustomListItem'
import NewPageModal from './NewPageModal'

const PageList = () => {
  const [pages, setPages] = useState<IPage[]>([])
  const { sectionId, setPageId } = useNote()

  useEffect(() => {
    console.log(sectionId)

    if (sectionId) {
      const f = async () => {
        const data = await getPages(sectionId)
        console.log(data)

        setPages(data)
      }

      f().catch((e) => console.log(e))
    }
  }, [sectionId])

  return (
    <Flex border="1px solid #333" w="170px" direction="column" padding="10px">
      <UnorderedList listStyleType="none" margin="0">
        {pages.map((page: IPage) => (
          <CustomListItem key={page.id}>{page.name}</CustomListItem>
        ))}
      </UnorderedList>
      <Spacer />
      <NewPageModal />
    </Flex>
  )
}

export default PageList
