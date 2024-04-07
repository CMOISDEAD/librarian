import { Toaster } from 'react-hot-toast'
import { Navbar } from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  )
}
