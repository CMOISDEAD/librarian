import { Button } from '@nextui-org/react'
import { RxGithubLogo } from 'react-icons/rx'

export const AboutActions = () => {
  const openExternal = window.api.shell.openExternal

  return (
    <div className="flex flex-col gap-4">
      <div className="flex content-center justify-between px-3">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold">Librarian</h1>
          <p className="text-sm">A simple desktop application to manage your library of books.</p>
        </div>

        <div className="flex-grow">
          <h2 className="text-xl font-bold">Version</h2>
          <p className="text-sm">0.1.0</p>
          <h2 className="text-xl font-bold">License</h2>
          <p className="text-sm">GNU General Public License v3.0</p>
        </div>
      </div>
      <Button
        size="sm"
        variant="flat"
        startContent={<RxGithubLogo />}
        onPress={() => openExternal('https://github.com/CMOISDEAD/librarian')}
      >
        Source Code
      </Button>
    </div>
  )
}
