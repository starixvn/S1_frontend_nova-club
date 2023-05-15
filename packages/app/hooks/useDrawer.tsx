import { createContext, useContext } from 'react'

export const DrawerContext = createContext({
  isOpen: false,
  toggleDrawer: () => {},
})

export const useDrawer = () => useContext(DrawerContext)
