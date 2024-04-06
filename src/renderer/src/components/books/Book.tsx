import { Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react'
import { IBook } from '@renderer/global'

interface Props {
  book: IBook
}

export const Book = ({ book }: Props) => {
  const handleSelect = () => {}

  return (
    <Card isPressable className="w-60 h-[22rem]" onPress={handleSelect}>
      <CardHeader>
        <Image
          removeWrapper
          src={book.cover}
          alt={book.title}
          className="w-full h-52 object-cover"
        />
      </CardHeader>
      <CardBody>
        <h2 className="text-lg font-semibold truncate">{book.title}</h2>
        <p className="text-sm text-gray-500">{book.author}</p>
      </CardBody>
      <CardFooter>
        <p className="text-sm text-gray-500">{book.year}</p>
      </CardFooter>
    </Card>
  )
}
