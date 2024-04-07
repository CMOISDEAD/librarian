import { useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { RxBell } from 'react-icons/rx'

export const NotificationList = () => {
  const [notifications, _setNotifications] = useState([])

  return (
    <Dropdown closeOnSelect={false}>
      <DropdownTrigger>
        <Button isIconOnly color="primary" variant="flat">
          <RxBell />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="notification list">
        {notifications.map(({ message, createdAt }, i) => (
          <DropdownItem key={i}>
            <p>{message}</p>
            <p className="text-sm text-secondary">{createdAt}</p>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
