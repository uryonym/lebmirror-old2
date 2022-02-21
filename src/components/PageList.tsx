import { getPageContent, getPages } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { IPage } from 'models'
import { useEffect, useState } from 'react'
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
    <div className="page-list">
      <div className="page-list-item">
        <ul className="item-list">
          {pages.map((page: IPage) => (
            <li key={page.id} onClick={() => clickPage(page.id)}>
              {page.name}
            </li>
          ))}
        </ul>
      </div>
      <NewPageModal />
    </div>
  )
}

export default PageList
