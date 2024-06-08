import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { IAuthor } from '@renderer/global'
import { Form } from './Form'
import { RxPencil2 } from 'react-icons/rx'

interface Props {
  author: IAuthor
}

export const UpdateAuthor = ({ author }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen}>
        <RxPencil2 />
      </Button>
      <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Book</ModalHeader>
              <ModalBody>
                <Form author={author} />
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
