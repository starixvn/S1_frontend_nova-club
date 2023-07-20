import { DrawerContext } from 'app/hooks/useDrawer'
import { useCallback, useState } from 'react'
import Drawer, { MemoDrawer } from '.'
import { useResponsiveValue } from 'dripsy'

const DrawerProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  const toggleDrawer = useCallback((open?: boolean) => {
    setOpen((prev) => (open === undefined ? !prev : open))
  }, [])

  return (
    <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>
      <MemoDrawer>{children}</MemoDrawer>
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
