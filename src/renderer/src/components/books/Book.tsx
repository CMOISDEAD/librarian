import { Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react'
import { IBook } from '@renderer/global'
import { useLibraryStore } from '@renderer/store/store'

interface Props {
  book: IBook
}

export const Book = ({ book }: Props) => {
  const { setSelectedBook } = useLibraryStore((state) => state)

  const handleSelect = () => setSelectedBook(book)

  return (
    <Card isPressable className="w-48 h-[20rem]" onPress={handleSelect}>
      <CardBody className="p-0">
        <Image
          removeWrapper
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </CardBody>
    </Card>
  )
}
