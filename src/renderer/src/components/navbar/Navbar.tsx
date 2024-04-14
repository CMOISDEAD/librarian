import { RxArchive, RxGear, RxMagnifyingGlass, RxMoon, RxSun } from 'react-icons/rx'
import {
  Navbar as Bar,
  Button,
  Input,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { NotificationList } from './NotificationList'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Bar isBordered maxWidth="full">
      <NavbarBrand className="text-foreground gap-2">
        <Link href="/" className="gap-2 text-foreground">
          <RxArchive />
          <p className="font-bold text-inherit">Librarian</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input placeholder="Search" startContent={<RxMagnifyingGlass />} color="primary" />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
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
