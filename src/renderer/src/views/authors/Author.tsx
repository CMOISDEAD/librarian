import { Image, Spinner } from '@nextui-org/react'
import { Book } from '@renderer/components/books/Book'
import { IAuthor } from '@renderer/global'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Author = () => {
  const ipcHandler = window.electron.ipcRenderer
  const [author, setAuthor] = useState<IAuthor | null>(null)
  const { authorId } = useParams()

  useEffect(() => {
    ipcHandler
      .invoke('get-author', authorId)
      .then((author) => setAuthor(author))
      .catch((err) => console.error(err))
  }, [])

  if (!author) {
    return (
      <div className="h-full flex content-center items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="my-3">
        <header className="flex gap-2 w-full">
          <Image
            removeWrapper
            width={112}
            height={112}
            fallbackSrc="https://via.placeholder.com/112x112"
            src={author.image || 'https://via.placeholder.com/112x112'}
            alt={`author ${author.name} image`}
            className="object-cover w-28 h-28"
          />
          <div className="flex-grow">
            <h2 className="text-2xl font-bold">{author.name}</h2>
            <p className="text-sm line-clamp-4">{author.description}</p>
          </div>
        </header>
        <div className="my-4">
          <h2 className="text-2xl font-bold">Books</h2>
          <div className="grid grid-cols-5 grid-flow-row gap-4 py-3 px-1">
            {author.books.length ? (
              author.books.map((book, i) => <Book key={i} book={book} />)
            ) : (
              <div className="w-full min-h-52 flex justify-center items-center">
                <p className="text-gray-500">No Books were found for this author.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
