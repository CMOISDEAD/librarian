import { useEffect, useState } from 'react'
import { useLibraryStore } from '@renderer/store/store'
import { Skeleton } from '@nextui-org/react'
import { Book } from './Book'

export const RecentList = () => {
  const ipcHandler = window.electron.ipcRenderer
  const [isLoading, setIsLoading] = useState(true)
  const { recents, setRecents } = useLibraryStore((state) => state)

  useEffect(() => {
    ipcHandler
      .invoke('get-recents')
      .then((recents) => {
        setIsLoading(false)
        setRecents(recents)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error(err)
      })
  }, [])

  return (
    <div className="my-1">
      <h2 className="text-2xl font-bold">Recent Ones</h2>
      <p className="text-gray-500">Books you've recently opened</p>
      <div className="w-full flex gap-4 overflow-x-scroll py-3 px-1">
        {isLoading ? (
          <Skeleton className="rounded-lg">
            <Book book={null} />
          </Skeleton>
        ) : recents.length ? (
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
