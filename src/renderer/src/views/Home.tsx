import { ListBooks } from '@renderer/components/books/BooksList'
import { RecentList } from '@renderer/components/books/RecentList'
import { Sidebar } from '@renderer/components/sidebar/Sidebar'

export const Home = () => {
  return (
    <div className="flex h-full flex-1">
      <div className="container mx-auto w-full p-1">
        <RecentList />
        <ListBooks />
      </div>
      <Sidebar />
    </div>
  )
}
