import { Flex, Spacer, UnorderedList } from '@chakra-ui/react'
import { getPageContent, getPages } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { IPage } from 'models'
import { useEffect, useState } from 'react'
import CustomListItem from './CustomListItem'
import NewPageModal from './NewPageModal'

const PageList = () => {
  const [pages, setPages] = useState<IPage[]>([])
  const { sectionId, setPageId, setContent } = useNote()

  useEffect(() => {
    if (sectionId) {
      const f = async () => {
        const data = await getPages(sectionId)
        setPages(data)
      }

      f().catch((e) => console.log(e))
    }
  }, [sectionId])

  const clickPage = async (pageId: string | undefined) => {
    setPageId(pageId)
    if (pageId) {
      const content = await getPageContent(pageId)
      setContent(content)
    }
  }

  return (
    <Flex border="1px solid #333" w="170px" direction="column" padding="10px">
      <UnorderedList listStyleType="none" margin="0">
        {pages.map((page: IPage) => (
          <CustomListItem key={page.id} onClick={() => clickPage(page.id)}>
            {page.name}
          </CustomListItem>
        ))}
      </UnorderedList>
      <Spacer />
      <NewPageModal />
    </Flex>
  )
}

export default PageList
