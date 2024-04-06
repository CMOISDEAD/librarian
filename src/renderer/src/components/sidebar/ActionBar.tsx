import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { RxArrowLeft, RxArrowRight, RxDotsHorizontal } from 'react-icons/rx'

export const ActionBar = ({ open, toggle }) => {
  return (
    <div className="z-50 flex flex-col gap-2 border-l border-divider p-1 bg-background h-full">
      <Button isIconOnly color="primary" variant="light" size="sm" onPress={() => toggle()}>
        {open ? <RxArrowRight /> : <RxArrowLeft />}
      </Button>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button isIconOnly color="primary" variant="light" size="sm">
            <RxDotsHorizontal />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Book Actions">
          <DropdownItem key="read">Read</DropdownItem>
          <DropdownItem key="edit">Edit</DropdownItem>
          <DropdownItem key="delete">Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
