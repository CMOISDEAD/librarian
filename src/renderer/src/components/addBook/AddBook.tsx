import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { RxPlus } from 'react-icons/rx'
import { Form } from './Form'

export const AddBook = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button isIconOnly color="primary" variant="light" size="sm" onPress={onOpen}>
        <RxPlus />
      </Button>
      <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add a new book</ModalHeader>
              <ModalBody>
                <Form />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
