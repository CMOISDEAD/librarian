import { useLibraryStore } from '@renderer/store/store'
import { Book } from './Book'

export const ListBooks = () => {
  const { books } = useLibraryStore((state) => state)

  return (
    <div className="my-1">
      <h2 className="text-2xl font-bold">On the shelf</h2>
      <p className="text-gray-500">Books you have in your library</p>
      <div className="flex flex-wrap content-center items-center gap-4">
        {books.map((book, i) => (
          <Book key={i} book={book} />
        ))}
      </div>
    </div>
  )
}
