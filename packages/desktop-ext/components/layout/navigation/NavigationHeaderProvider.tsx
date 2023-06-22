import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import LiveCasino from './dropdown/LiveCasino'
import Sportsbook from './dropdown/Sportsbook'
import usePathname from 'app/hooks/usePathname'

const NavigationHeaderContext = createContext<
  Dispatch<SetStateAction<string | undefined>>
>((v) => {})

export enum NAVIGATION_DROPDOWN_MENU {
  Sportsbook = 'sportsbook',
  LiveCasino = 'livecasino',
}

const NavigationHeaderProvider = ({ children }) => {
  const [menu, setMenu] = useState<NAVIGATION_DROPDOWN_MENU | undefined>()

  const pathname = usePathname()
  const DropDown = useMemo(() => {
    console.log('pathname', pathname, menu)
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
    <NavigationHeaderContext.Provider value={setMenu}>
      {children}
      {DropDown}
    </NavigationHeaderContext.Provider>
  )
}

export function useNavigationHeader() {
  return useContext(NavigationHeaderContext)
}

export default NavigationHeaderProvider
