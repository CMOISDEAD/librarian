import { ListBooks } from '@renderer/components/books/ListBooks'
import { Sidebar } from '@renderer/components/sidebar/Sidebar'

export const Home = () => {
  return (
    <div className="flex h-full flex-1">
      <div className="container mx-auto w-full p-1">
        <ListBooks />
      </div>
      <Sidebar />
    </div>
  )
}
