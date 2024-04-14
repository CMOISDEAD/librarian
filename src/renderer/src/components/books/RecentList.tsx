import { useLibraryStore } from '@renderer/store/store'
import { Book } from './Book'

export const RecentList = () => {
  const { recents } = useLibraryStore((state) => state)

  return (
    <div className="my-1">
      <h2 className="text-2xl font-bold">Recent Ones</h2>
      <p className="text-gray-500">Books you've recently opened</p>
      <div className="w-full flex gap-4 overflow-x-scroll py-3 px-1">
        {recents.length ? (
          recents.map((book, i) => <Book key={i} book={book} />)
        ) : (
          <div className="w-full h-52 flex justify-center items-center">
            <p className="text-gray-500">No recent books</p>
          </div>
        )}
      </div>
    </div>
  )
}
