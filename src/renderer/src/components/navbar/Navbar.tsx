import {
  RxArchive,
  RxGear,
  RxMagnifyingGlass,
  RxMoon,
  RxPerson,
  RxSun,
  RxCardStack
} from 'react-icons/rx'
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
      href: '/',
      icon: <RxArchive />
    },
    {
      title: 'Authors',
      href: '/authors',
      icon: <RxPerson />
    },
    {
      title: 'Categories',
      href: '/categories',
      icon: <RxCardStack />
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
        <Button startContent={links[active].icon} variant="light" color="primary">
          <p className="font-bold text-foreground">{links[active].title}</p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="link-actions" items={links} color="primary" variant="flat">
        {links.map((link) => (
          <DropdownItem key={link.title} textValue={link.title} startContent={link.icon}>
            <Link href={link.href} className="text-sm w-full" color="foreground">
              {link.title}
            </Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
