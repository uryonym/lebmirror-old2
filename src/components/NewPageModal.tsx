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
  Text,
} from '@chakra-ui/react'
import { addPage } from 'api/notesApi'
import { useNote } from 'contexts/noteContext'
import { IPage } from 'models'
import { ChangeEvent, useRef, useState } from 'react'

const NewPageModal = () => {
  const [pageName, setPageName] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef<HTMLInputElement>(null)
  const { sectionId } = useNote()
  const isEmptySection: boolean = sectionId === undefined

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPageName(e.target.value)
  }

  const clickCreatePage = async () => {
    onClose()
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
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        ページ作成
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規ページの作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isEmptySection ? (
              <Text>セクションを選択してください。</Text>
            ) : (
              <FormControl>
                <Input
                  ref={initialRef}
                  placeholder="ページ名を入力"
                  value={pageName}
                  onChange={handleChange}
                />
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={clickCreatePage}
              isDisabled={isEmptySection}
            >
              作成
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewPageModal
