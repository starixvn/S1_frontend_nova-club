import React, {
  Dispatch,
  SetStateAction,
  createContext,
  startTransition,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import LiveCasino from './dropdown/LiveCasino'
import Sportsbook from './dropdown/Sportsbook'
import usePathname from 'app/hooks/usePathname'
import debounce from 'lodash/debounce'

const NavigationHeaderContext = createContext<
  (menu: NAVIGATION_DROPDOWN_MENU | undefined) => void
>((v) => {})

export enum NAVIGATION_DROPDOWN_MENU {
  Sportsbook = 'sportsbook',
  LiveCasino = 'livecasino',
}

const NavigationHeaderProvider = ({ children }) => {
  const [menu, setMenu] = useState<NAVIGATION_DROPDOWN_MENU | undefined>()

  const toggleMenu = useCallback((m: NAVIGATION_DROPDOWN_MENU | undefined) => {
    if (!m) startTransition(() => setMenu(undefined))
    else setMenu(m)
  }, [])

  const pathname = usePathname()
  const DropDown = useMemo(() => {
    if (menu) {
      if (pathname.includes(menu)) return null

      switch (menu) {
        case NAVIGATION_DROPDOWN_MENU.Sportsbook: {
          return <Sportsbook />
        }
        case NAVIGATION_DROPDOWN_MENU.LiveCasino: {
          return <LiveCasino />
        }
      }
    }

    return null
  }, [menu, pathname])

  return (
    <NavigationHeaderContext.Provider value={toggleMenu}>
      {children}
      {DropDown}
    </NavigationHeaderContext.Provider>
  )
}

export function useNavigationHeader() {
  return useContext(NavigationHeaderContext)
}

export default NavigationHeaderProvider
