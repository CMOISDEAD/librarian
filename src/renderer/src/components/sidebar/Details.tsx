import { Image } from '@nextui-org/react'
import { IBook } from '@renderer/global'
import { RxCalendar, RxFrame, RxPerson } from 'react-icons/rx'

export const Details = ({ book }: { book: IBook }) => {
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
        <h3 className="text-lg font-bold text-gray-500">Description</h3>
        <p className="text-sm">{book.description}</p>
      </div>
      <ul className="text-gray-500">
        <li className="flex gap-2 content-center items-center">
          <RxPerson />
          <span>{book.author}</span>
        </li>
        <li className="flex gap-2 content-center items-center">
          <RxFrame />
          <span>{book.pages} pages</span>
        </li>
        <li className="flex gap-2 content-center items-center">
          <RxCalendar />
          <span>{book.year}</span>
        </li>
      </ul>
    </div>
  )
}
