import { useEffect, useState } from 'react'
import { Skeleton } from '@nextui-org/react'
import { useLibraryStore } from '@renderer/store/store'
import { Book } from './Book'

export const ListBooks = () => {
  const ipcHandler = window.electron.ipcRenderer
  const [isLoading, setIsLoading] = useState(true)
  const { books, setBooks } = useLibraryStore((state) => state)

  useEffect(() => {
    ipcHandler
      .invoke('get-books')
      .then((books) => {
        setIsLoading(false)
        setBooks(books)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error(err)
      })
  }, [])

  return (
    <div className="my-1">
      <h2 className="text-2xl font-bold">On the shelf</h2>
      <p className="text-gray-500">Books you have in your library</p>
      <div className="flex flex-wrap content-center items-center gap-4 py-3 px-1">
        {isLoading ? (
          <Skeleton className="rounded-lg">
            <Book book={null} />
          </Skeleton>
        ) : books.length ? (
          books.map((book, i) => <Book key={i} book={book} />)
        ) : (
          <div className="w-full min-h-52 flex justify-center items-center">
            <p className="text-gray-500">No books in your library</p>
          </div>
        )}
      </div>
    </div>
  )
}
