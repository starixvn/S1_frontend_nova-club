import { DrawerContext } from 'app/hooks/useDrawer'
import { useCallback, useState } from 'react'
import Drawer from '.'

const DrawerProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false)

  const toggleDrawer = useCallback((open?: boolean) => {
    setOpen((prev) => (open === undefined ? !prev : open))
  }, [])

  return (
    <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>
      <Drawer>{children}</Drawer>
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
