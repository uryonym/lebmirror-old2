import { Flex, Spacer, UnorderedList } from '@chakra-ui/react'
import { IPage } from 'models'
import CustomListItem from './CustomListItem'
import NewPageModal from './NewPageModal'

const pages: IPage[] = [
  {
    name: 'ページ名１',
    content: '## サンプルタイトル１\nサンプルコンテンツ\n',
    sectionId: 'section_id1',
    createdAt: new Date(),
    id: 'page_id1',
  },
  {
    name: 'ページ名２',
    content: '## サンプルタイトル２\nサンプルコンテンツ\n',
    sectionId: 'section_id1',
    createdAt: new Date(),
    id: 'page_id2',
  },
  {
    name: 'ページ名３',
    content: '## サンプルタイトル３\nサンプルコンテンツ\n',
    sectionId: 'section_id1',
    createdAt: new Date(),
    id: 'page_id3',
  },
]

const PageList = () => (
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

export default PageList
