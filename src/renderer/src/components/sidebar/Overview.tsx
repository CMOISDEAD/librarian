import { AnimatePresence, motion } from 'framer-motion'
import { Card, CardBody } from '@nextui-org/react'
import { Details } from './Details'
import { useLibraryStore } from '@renderer/store/store'
import { useEffect } from 'react'

export const Overview = ({ open }) => {
  const ipcHandler = window.electron.ipcRenderer
  const { selected, setSelected } = useLibraryStore((state) => state)

  useEffect(() => {
    ipcHandler
      .invoke('get-selected')
      .then((book) => setSelected(book))
      .catch((err) => console.error(err))
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: '-13%' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed right-0 w-3/12 px-2 h-full z-50 mt-1"
        >
          <Card className="flex flex-col gap-2 content-center h-[90%]">
            <CardBody className="flex flex-col items-stretch gap-2">
              {selected ? (
                <Details book={selected} />
              ) : (
                <div className="flex content-center items-center justify-center h-full">
                  <p className="text-content4 text-sm">Select a book to view its details.</p>
                </div>
              )}
            </CardBody>
          </Card>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
