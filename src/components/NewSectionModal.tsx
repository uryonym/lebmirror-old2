import { addSection } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { ISection } from 'models'
import { ChangeEvent, useState } from 'react'
import { useModal } from 'react-hooks-use-modal'

const NewSectionModal = () => {
  const [sectionName, setSectionName] = useState<string>('')
  const [Modal, open, close] = useModal('root')
  const { noteId } = useNote()
  const isEmptyNote: boolean = noteId === undefined

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSectionName(e.target.value)
  }

  const clickCreateSection = async () => {
    close()
    const data: ISection = {
      name: sectionName,
      noteId: noteId!,
      createdAt: undefined,
      id: undefined,
    }
    await addSection(data).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div className="new-section">
      <button type="button" onClick={open}>
        セクション作成
      </button>
      <Modal>
        <div className="basic-modal">
          <h2>新規セクションの作成</h2>
          {isEmptyNote ? (
            <p>ノートを選択してください。</p>
          ) : (
            <input type="text" placeholder="セクション名を入力" value={sectionName} onChange={handleChange} />
          )}
          <button type="button" onClick={clickCreateSection} disabled={isEmptyNote}>
            作成
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default NewSectionModal
