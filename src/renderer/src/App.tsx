import { Route, Routes } from 'react-router-dom'
import { Providers } from './components/layout/Providers'
import { Home } from './views/Home'
import { Layout } from './components/layout/Layout'
import { Settings } from './views/Settings'

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Providers>
  )
}

export default App
