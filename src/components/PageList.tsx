import { Divider, List, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material'
import { getPageContent, getPages } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { ContextState } from 'lib/constant'
import { IPage } from 'models'
import { useEffect, useState, MouseEvent } from 'react'
import NewPageModal from './NewPageModal'

const PageList = () => {
  const [pages, setPages] = useState<IPage[]>([])
  const [contextMenu, setContextMenu] = useState<ContextState | null>(null)
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

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>, pageId: string | undefined) => {
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
          }
        : null
    )
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  return (
    <div className="page-list">
      <div className="page-list-item">
        <List>
          {pages.map((page: IPage) => (
            <>
              <ListItemButton onClick={() => clickPage(page.id)} onContextMenu={(e) => handleContextMenu(e, page.id)}>
                <ListItemText primary={page.name} />
              </ListItemButton>
              <Divider component="li" />
            </>
          ))}
        </List>
      </div>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        <MenuItem onClick={handleClose}>名前変更</MenuItem>
        <MenuItem onClick={handleClose}>削除</MenuItem>
      </Menu>
      <NewPageModal />
    </div>
  )
}

export default PageList
