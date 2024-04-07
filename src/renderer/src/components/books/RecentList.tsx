import { useLibraryStore } from '@renderer/store/store'
import { Book } from './Book'

export const RecentList = () => {
  const { books } = useLibraryStore((state) => state)

  return (
    <div className="my-1">
      <h2 className="text-2xl font-bold">Recent Ones</h2>
      <p className="text-gray-500">Books you've recently opened</p>
      <div className="w-full flex gap-4 overflow-x-scroll">
        {books
          .slice(0, 8)
          .sort(() => Math.random() - 0.5)
          .map((book, i) => (
            <Book key={i} book={book} />
          ))}
      </div>
    </div>
  )
}
