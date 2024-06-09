import { useEffect } from 'react'
import { useLibraryStore } from '@renderer/store/store'
import { Book } from '@renderer/components/books/Book'

export const Categories = () => {
  const ipcHandler = window.electron.ipcRenderer
  const { categories, setCategories } = useLibraryStore((state) => state)

  useEffect(() => {
    ipcHandler
      .invoke('get-categories')
      .then((categories) => setCategories(categories))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="container mx-auto">
      <main className="my-3">
        <div className="flex content-center justify-between">
          <h2 className="text-2xl font-bold">Discover Hidden Gems on Our Shelves</h2>
        </div>
        <div className="my-4 flex flex-col gap-4">
          {categories.length ? (
            categories.map((category) => (
              <div key={category.id} className="bg-content1/70 py-3 px-5 rounded">
                <h2 className="text-2xl font-bold capitalize">{category.name}</h2>
                <div className="flex flex-nowrap gap-4 overflow-x-auto mt-4">
                  {category.books?.length ? (
                    category.books.map((book) => <Book key={book.id} book={book} />)
                  ) : (
                    <p className="text-xs text-gray-500">No books found</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">No categories found</p>
          )}
        </div>
      </main>
    </div>
  )
}
