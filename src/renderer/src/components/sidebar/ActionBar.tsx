import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure
} from '@nextui-org/react'
import { RxArrowLeft, RxArrowRight, RxDotsHorizontal } from 'react-icons/rx'
import { AddBook } from '../addBook/AddBook'
import { useLibraryStore } from '@renderer/store/store'
import toast from 'react-hot-toast'
import { UpdateBook } from '../addBook/UpdateBook'

export const ActionBar = ({ open, toggle }) => {
  const shell = window.api.shell
  const ipcHandle = window.electron.ipcRenderer
  const { selected: selectedBook, setBooks, setSelected } = useLibraryStore((state) => state)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleDelete = () => {
    if (!selectedBook) return
    const { books, selected } = ipcHandle.sendSync('delete-book', selectedBook)
    setBooks(books)
    setSelected(selected)
    toast.success('Book deleted successfully')
  }

  const handleOpen = () => {
    if (!selectedBook) return
    shell.openExternal(`file://${selectedBook.path}`)
  }

  return (
    <div className="z-50 fixed right-0 flex flex-col gap-2 border-l border-divider p-1 bg-background/70 backdrop-blur-lg backdrop-saturate-150 h-full">
      <Button isIconOnly color="primary" variant="light" size="sm" onPress={() => toggle()}>
        {open ? <RxArrowRight /> : <RxArrowLeft />}
      </Button>
      <AddBook />
      <Dropdown backdrop="opaque">
        <DropdownTrigger>
          <Button isIconOnly color="primary" variant="light" size="sm" isDisabled={!selectedBook}>
            <RxDotsHorizontal />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Book Actions">
          <DropdownItem key="read" onPress={handleOpen}>
            Read
          </DropdownItem>
          <DropdownItem key="edit" onPress={onOpen}>
            Edit
          </DropdownItem>
          <DropdownItem key="delete" onPress={handleDelete}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <UpdateBook book={selectedBook!} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  )
}
