import { DrawerContext } from 'app/hooks/useDrawer'
import { useAppSelector } from 'app/provider/redux/store'
import { useResponsiveValue } from 'dripsy'
import { useCallback, useState } from 'react'
import { Platform } from 'react-native'
import { MemoDrawer } from '.'

const DrawerProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  const isDesktop = useResponsiveValue([false, false, false, true, true])

  const toggleDrawer = useCallback((open?: boolean) => {
    setOpen((prev) => (open === undefined ? !prev : open))
  }, [])

  const splashScreenLoaded = useAppSelector(
    (s) => s.tempSetting.splashScreenLoaded
  )

  if (!splashScreenLoaded && (isDesktop || Platform.OS !== 'web'))
    return children

  return (
    <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>
      <MemoDrawer>{children}</MemoDrawer>
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
