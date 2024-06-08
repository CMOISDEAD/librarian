import { Book as IBook } from '@renderer/global'
import { Card, CardBody, Image } from '@nextui-org/react'
import { useLibraryStore } from '@renderer/store/store'

interface Props {
  book: IBook
}

export const Book = ({ book }: Props) => {
  const openExternal = window.api.shell.openExternal
  const ipcHandler = window.electron.ipcRenderer
  const { setSelected, setRecents } = useLibraryStore((state) => state)

  const handleSelect = async () => {
    const selected = await ipcHandler.invoke('save-selected', book.id)
    setSelected(selected)
  }

  const handleOpen = async () => {
    openExternal(`file://${book.path}`)
    const recents = await ipcHandler.invoke('add-recent', book)
    setRecents(recents)
  }

  return (
    <Card
      isBlurred
      isPressable
      className="w-48 min-w-48 h-[20rem]"
      onPress={handleSelect}
      onDoubleClick={handleOpen}
    >
      <CardBody>
        <Image
          isBlurred
          src={book.cover}
          alt={book.title}
          classNames={{
            img: 'w-full h-full object-cover',
            wrapper: 'w-full h-full'
          }}
        />
      </CardBody>
    </Card>
  )
}
