import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { RxArrowLeft, RxArrowRight, RxDotsHorizontal } from 'react-icons/rx'
import { AddModal } from '../addModal/AddModal'
import { useLibraryStore } from '@renderer/store/store'
import toast from 'react-hot-toast'

export const ActionBar = ({ open, toggle }) => {
  const ipcHandle = window.electron.ipcRenderer
  const { selected: selectedBook, setBooks, setSelected } = useLibraryStore((state) => state)

  const handleDelete = () => {
    if (!selectedBook) return
    const { books, selected } = ipcHandle.sendSync('delete-book', selectedBook)
    setBooks(books)
    setSelected(selected)
    toast.success('Book deleted successfully')
  }

  return (
    <div className="z-50 fixed right-0 flex flex-col gap-2 border-l border-divider p-1 bg-background/70 backdrop-blur-lg backdrop-saturate-150 h-full">
      <Button isIconOnly color="primary" variant="light" size="sm" onPress={() => toggle()}>
        {open ? <RxArrowRight /> : <RxArrowLeft />}
      </Button>
      <AddModal />
      <Dropdown backdrop="opaque">
        <DropdownTrigger>
          <Button isIconOnly color="primary" variant="light" size="sm" isDisabled={!selectedBook}>
            <RxDotsHorizontal />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Book Actions">
          <DropdownItem key="read">Read</DropdownItem>
          <DropdownItem key="edit">Edit</DropdownItem>
          <DropdownItem key="delete" onPress={handleDelete}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
