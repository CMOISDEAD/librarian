import { Toaster } from 'react-hot-toast'
import { Navbar } from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Toast } from './Toast'

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Toaster position="bottom-center">{(t) => <Toast t={t} />}</Toaster>
    </div>
  )
}
