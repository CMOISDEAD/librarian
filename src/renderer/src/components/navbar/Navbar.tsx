import { RxArchive, RxGear, RxMagnifyingGlass, RxMoon, RxPerson, RxSun } from 'react-icons/rx'
import {
  Navbar as Bar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { NotificationList } from './NotificationList'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Bar isBordered maxWidth="full">
      <NavbarBrand className="text-foreground gap-2">
        <NavigationList />
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Input placeholder="Search" startContent={<RxMagnifyingGlass />} color="primary" />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button isIconOnly as={Link} href="/authors" color="primary" variant="flat">
            <RxPerson />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <NotificationList />
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly color="primary" variant="flat" onPress={handleThemeChange}>
            {theme === 'dark' ? <RxSun /> : <RxMoon />}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly as={Link} href="/settings" color="primary" variant="flat">
            <RxGear />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Bar>
  )
}

const NavigationList = () => {
  const [active, setActive] = useState(0)
  const location = useLocation()
  const links = [
    {
      title: 'Librarian',
      href: '/'
    },
    {
      title: 'Authors',
      href: '/authors'
    },
    {
      title: 'Categories',
      href: '/'
    }
  ]

  useEffect(() => {
    const { pathname } = location
    const index = links.findIndex((link) => link.href === pathname)
    if (index === -1) return setActive(0)
    setActive(index)
  }, [location])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button startContent={<RxArchive />} variant="light" color="primary">
          <p className="font-bold text-foreground">{links[active].title}</p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="link-actions" items={links}>
        {links.map((link) => (
          <DropdownItem key={link.title} textValue={link.title}>
            <Link href={link.href} className="text-sm w-full" color="foreground">
              {link.title}
            </Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
