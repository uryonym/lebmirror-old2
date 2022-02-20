import { getSections } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { ISection } from 'models'
import { useEffect, useState } from 'react'
import NewSectionModal from './NewSectionModal'

const SectionList = () => {
  const [sections, setSections] = useState<ISection[]>([])
  const { noteId, setSectionId } = useNote()

  useEffect(() => {
    if (noteId) {
      const f = async () => {
        const data = await getSections(noteId)
        setSections(data)
      }

      f().catch((e) => console.log(e))
    }
  }, [noteId])

  const clickSection = (sectionId: string | undefined) => {
    setSectionId(sectionId)
  }

  return (
    <div className="section-list">
      <ul className="item-list">
        {sections.map((section: ISection) => (
          <li key={section.id} onClick={() => clickSection(section.id)}>
            {section.name}
          </li>
        ))}
      </ul>
      <div className="flex-spacer" />
      <NewSectionModal />
    </div>
  )
}

export default SectionList
