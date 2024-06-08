import { Image, Link } from '@nextui-org/react'
import { Book } from '@renderer/global'
import { RxCalendar, RxFrame, RxPerson } from 'react-icons/rx'

export const Details = ({ book }: { book: Book }) => {
  return (
    <div className="flex flex-col justify-between gap-4 h-full">
      <div className="self-center">
        <Image
          isBlurred
          src={book.cover}
          alt="book image cover"
          className="h-96 object-cover self-center"
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-bold">{book.title}</h2>
        <p className="text-sm">{book.description}</p>
      </div>
      <ul className="text-gray-500">
        <li className="flex gap-2 content-center items-center">
          <Link href={`/authors`}>
            <RxPerson />
            <span>{book.author?.name}</span>
          </Link>
        </li>
        <li className="flex gap-2 content-center items-center">
          <RxFrame />
          <span>{book.pages} pages</span>
        </li>
        <li className="flex gap-2 content-center items-center">
          <RxCalendar />
          <span>{book.category?.name}</span>
        </li>
      </ul>
    </div>
  )
}
