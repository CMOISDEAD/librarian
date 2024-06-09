import { Route, Routes } from 'react-router-dom'
import { Providers } from './components/layout/Providers'
import { Home } from './views/Home'
import { Layout } from './components/layout/Layout'
import { Settings } from './views/Settings'
import { useEffect } from 'react'
import { useLibraryStore } from './store/store'
import { Authors } from './views/authors/'
import { Author } from './views/authors/Author'
import { Categories } from './views/categories'

function App() {
  const ipcHandle = window.electron.ipcRenderer
  const { setStore } = useLibraryStore((state) => state)

  useEffect(() => {
    ipcHandle
      .invoke('get-store')
      .then((store) => {
        console.log('store', store)
        setStore(store)
      })
      .catch((e) => console.error(e))
  }, [])

  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:authorId" element={<Author />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </Providers>
  )
}

export default App
