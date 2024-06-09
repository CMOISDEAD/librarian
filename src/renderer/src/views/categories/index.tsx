import { useEffect } from 'react'
import { useLibraryStore } from '@renderer/store/store'
import { Accordion, AccordionItem, Card, CardBody } from '@nextui-org/react'
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
          <h2 className="text-2xl font-bold">Here are the categories, enjoy!</h2>
        </div>
        <div className="my-4">
          {categories ? (
            <Accordion fullWidth variant="splitted">
              {categories.map((category) => (
                <AccordionItem key={category.id} aria-label={category.name} title={category.name}>
                  <div className="flex flex-nowrap gap-4 overflow-x-auto">
                    {category.books.map((book) => (
                      <Book key={book.id} book={book} />
                    ))}
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-xs text-gray-500">No categories found</p>
          )}
        </div>
      </main>
    </div>
  )
}
