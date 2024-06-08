import { useEffect } from 'react'
import { AddAuthor } from '@renderer/components/authors/AddAuthor'
import { AuthorCard } from '@renderer/components/authors/AuthorCard'
import { useLibraryStore } from '@renderer/store/store'

export const Authors = () => {
  const ipcHandler = window.electron.ipcRenderer
  const { authors, setAuthors } = useLibraryStore((state) => state)

  useEffect(() => {
    ipcHandler
      .invoke('get-authors')
      .then((authors) => setAuthors(authors))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="container mx-auto">
      <main className="my-3">
        <div className="flex content-center justify-between">
          <h2 className="text-2xl font-bold">Here are the authors, enjoy!</h2>
          <AddAuthor />
        </div>
        <div className="my-4 grid grid-cols-1 grid-flow-rows gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {authors ? (
            authors.map((author) => <AuthorCard key={author.id} author={author} />)
          ) : (
            <p className="text-xs text-gray-500">No authors found</p>
          )}
        </div>
      </main>
    </div>
  )
}
