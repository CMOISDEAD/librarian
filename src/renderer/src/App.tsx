import { Route, Routes } from 'react-router-dom'
import { Providers } from './components/layout/Providers'
import { Home } from './views/Home'
import { Layout } from './components/layout/Layout'
import { Settings } from './views/Settings'
import { useEffect } from 'react'
import { useLibraryStore } from './store/store'
import { Authors } from './views/Authors'

function App() {
  const ipcHandle = window.electron.ipcRenderer
  const { setStore } = useLibraryStore((state) => state)

  useEffect(() => {
    const store = ipcHandle.sendSync('get-store')
    console.log('store', store)
    setStore(store)
  }, [])

  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/authors" element={<Authors />} />
        </Route>
      </Routes>
    </Providers>
  )
}

export default App
