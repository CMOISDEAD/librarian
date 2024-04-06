import { useCycle } from 'framer-motion'
import { Overview } from './Overview'
import { ActionBar } from './ActionBar'

export const Sidebar = () => {
  const [open, toggle] = useCycle(false, true)

  return (
    <div className="relative">
      <Overview open={open} />
      <ActionBar open={open} toggle={toggle} />
    </div>
  )
}
