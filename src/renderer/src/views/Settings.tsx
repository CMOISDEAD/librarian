import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import { RxBell, RxCardStack, RxInfoCircled, RxPerson, RxTrash } from 'react-icons/rx'
import { useLibraryStore } from '@renderer/store/store'
import { AboutActions } from '@renderer/components/configuration/AboutActions'

export const Settings = () => {
  const ipcHandler = window.electron.ipcRenderer
  const { setStore } = useLibraryStore((state) => state)

  const handleRemove = async () => {
    const def = await ipcHandler.invoke('clear-data')
    setStore(def)
  }

  return (
    <div className="container mx-auto my-5">
      <div className="flex flex-col justify-center items-center content-center">
        <Accordion fullWidth variant="splitted">
          <AccordionItem
            title="Account"
            startContent={<RxPerson />}
            subtitle="Manage your notification preferences"
          >
            <p className="text-sm text-foreground-400">
              We're working on this feature, stay tuned for updates.
            </p>
          </AccordionItem>
          <AccordionItem
            title="Notifications"
            startContent={<RxBell />}
            subtitle="Manage your notification preferences"
          >
            <p className="text-sm text-foreground-400">
              We're working on this feature, stay tuned for updates.
            </p>
          </AccordionItem>
          <AccordionItem
            title="Database"
            startContent={<RxCardStack />}
            subtitle="Manage your database"
          >
            <Button
              fullWidth
              size="sm"
              variant="flat"
              color="danger"
              startContent={<RxTrash />}
              onPress={handleRemove}
            >
              Clear Library
            </Button>
          </AccordionItem>
          <AccordionItem
            title="About"
            startContent={<RxInfoCircled />}
            subtitle="Learn more about the app"
          >
            <AboutActions />
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
