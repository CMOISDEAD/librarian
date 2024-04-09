import { Button, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react'
import { Form } from './Form'
import { IBook } from '@renderer/global'

interface Props {
  book: IBook
  isOpen: boolean
  onOpenChange: () => void
}

export const UpdateBook = ({ book, isOpen, onOpenChange }: Props) => {
  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Book</ModalHeader>
            <ModalBody>
              <Form book={book} />
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
  )
}
