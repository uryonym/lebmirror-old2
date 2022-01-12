import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  Input,
  useDisclosure,
} from '@chakra-ui/react'
import { addSection } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { ISection } from 'models'
import { ChangeEvent, useRef, useState } from 'react'

const NewSectionModal = () => {
  const [sectionName, setSectionName] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef<HTMLInputElement>(null)
  const { noteId } = useNote()
  const isEmptyNote: boolean = noteId === undefined

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSectionName(e.target.value)
  }

  const clickCreateSection = async () => {
    onClose()
    const data: ISection = {
      name: sectionName,
      note_id: noteId ?? '',
      createdAt: undefined,
      id: undefined,
    }
    await addSection(data).catch((e) => {
      console.log(e)
    })
  }

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        セクション作成
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規セクションの作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isEmptyNote ? (
              <Text>ノートを選択してください。</Text>
            ) : (
              <FormControl>
                <Input
                  ref={initialRef}
                  placeholder="セクション名を入力"
                  value={sectionName}
                  onChange={handleChange}
                />
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={clickCreateSection}
              isDisabled={isEmptyNote}
            >
              作成
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewSectionModal
