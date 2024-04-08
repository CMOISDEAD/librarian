import { IBook } from '@renderer/global'
import { Card, CardBody, Image } from '@nextui-org/react'
import { useLibraryStore } from '@renderer/store/store'

interface Props {
  book: IBook
}

export const Book = ({ book }: Props) => {
  const ipcHandler = window.electron.ipcRenderer
  const { setSelected } = useLibraryStore((state) => state)

  const handleSelect = () => {
    const selected: IBook = ipcHandler.sendSync('save-selected', book)
    setSelected(selected)
  }

  return (
    <Card isBlurred isPressable className="w-48 min-w-48 h-[20rem]" onPress={handleSelect}>
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
