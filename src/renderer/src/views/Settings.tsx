import { Button } from '@nextui-org/react'
import { useLibraryStore } from '@renderer/store/store'

export const Settings = () => {
  const ipcHandler = window.electron.ipcRenderer
  const { setStore } = useLibraryStore((state) => state)

  const handleRemove = () => {
    const def = ipcHandler.sendSync('clear-data')
    setStore(def)
  }

  return (
    <div className="container mx-auto my-1">
      <div className="flex justify-center items-center">
        <Button variant="flat" color="danger" onPress={handleRemove}>
          Clear all data
        </Button>
      </div>
    </div>
  )
}
