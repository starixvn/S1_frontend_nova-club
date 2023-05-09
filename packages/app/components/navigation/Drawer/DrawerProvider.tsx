import { createContext, useCallback, useContext, useState } from 'react'
import Drawer from '.'

const DrawerContext = createContext({
  isOpen: false,
  toggleDrawer: (open) => {},
})

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

export const useDrawer = () => useContext(DrawerContext)

export default DrawerProvider
