import {
  Button,
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
import { addNotes } from 'api/notesApi'
import { useAuth } from 'contexts/authContext'
import { INote } from 'models'
import { ChangeEvent, useRef, useState } from 'react'

const NewNoteModal = () => {
  const [noteName, setNoteName] = useState<string>('')
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteName(e.target.value)
  }

  const clickCreateNote = async () => {
    onClose()
    const data: INote = {
      name: noteName,
      uid: user?.uid ?? '',
      createdAt: undefined,
      id: undefined,
    }
    await addNotes(data).catch((e) => {
      console.log(e)
    })
  }

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        ノート作成
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規ノートの作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="ノート名を入力"
                value={noteName}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={clickCreateNote}>
              作成
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewNoteModal
