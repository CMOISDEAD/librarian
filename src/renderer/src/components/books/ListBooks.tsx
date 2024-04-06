import books from '../../utils/books'
import { Book } from './Book'

export const ListBooks = () => {
  return (
    <div className="flex flex-wrap content-center items-center gap-2">
      {books.map((book, i) => (
        <Book key={i} book={book} />
      ))}
    </div>
  )
}
