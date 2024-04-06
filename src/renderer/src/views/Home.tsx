import { Sidebar } from '@renderer/components/sidebar/Sidebar'

export const Home = () => {
  return (
    <div className="flex h-full flex-1">
      <div className="container mx-auto w-full p-1">
        <h1 className="text-2xl font-bold">Home</h1>
        <p>Welcome to the Home page</p>
      </div>
      <Sidebar />
    </div>
  )
}
