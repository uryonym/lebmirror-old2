import { addPage } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { IPage } from 'models'
import { ChangeEvent, useState } from 'react'
import { useModal } from 'react-hooks-use-modal'

const NewPageModal = () => {
  const [pageName, setPageName] = useState<string>('')
  const [Modal, open, close] = useModal('root')
  const { sectionId } = useNote()
  const isEmptySection: boolean = sectionId === undefined

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPageName(e.target.value)
  }

  const clickCreatePage = async () => {
    close()
    const data: IPage = {
      name: pageName,
      content: '',
      sectionId: sectionId!,
      createdAt: undefined,
      id: undefined,
    }
    await addPage(data).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div className="new-page">
      <button type="button" onClick={open}>
        ページ作成
      </button>
      <Modal>
        <div className="basic-modal">
          <h2>新規ページの作成</h2>
          {isEmptySection ? (
            <p>セクションを選択してください。</p>
          ) : (
            <input type="text" placeholder="ページ名を入力" value={pageName} onChange={handleChange} />
          )}
          <button type="button" onClick={clickCreatePage} disabled={isEmptySection}>
            作成
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default NewPageModal
