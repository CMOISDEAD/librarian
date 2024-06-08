import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'
// import { CommandMenu } from '../command/CommandMenu'
import { useNavigate } from 'react-router-dom'

export const Providers = ({ children }) => {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <NextThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemeProvider>
      {/* <CommandMenu /> */}
    </NextUIProvider>
  )
}
