import { DrawerContext } from 'app/hooks/useDrawer'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppSelector } from 'app/provider/redux/store'
import { useCallback, useState } from 'react'
import { Platform } from 'react-native'
import { MemoDrawer } from '.'

const DrawerProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  const isDesktop = useIsDesktop()

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
