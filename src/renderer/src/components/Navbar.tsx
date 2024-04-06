import { RxArchive, RxBell } from 'react-icons/rx'
import { Navbar as Bar, Button, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

export const Navbar = () => {
  return (
    <Bar maxWidth="full" shouldHideOnScroll>
      <NavbarBrand className="gap-2">
        <RxArchive />
        <p className="font-bold text-inherit">Librarian</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button isIconOnly color="primary" variant="flat">
            <RxBell />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Bar>
  )
}
