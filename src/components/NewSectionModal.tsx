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
import { useRef } from 'react'

const NewSectionModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef<HTMLInputElement>(null)
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
            <FormControl>
              <Input ref={initialRef} placeholder="セクション名を入力" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              作成
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewSectionModal
