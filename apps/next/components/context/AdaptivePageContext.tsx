import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

type AdaptivePageType = {
  isLoaded: boolean
  setLoaded: Dispatch<SetStateAction<boolean>>
}

const AdaptivePageContext = createContext<AdaptivePageType>({
  isLoaded: false,
  setLoaded: (v: SetStateAction<boolean>) => {},
})

export const AdaptivePageProvider = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setLoaded] = useState(false)

  const value = useMemo(() => ({ isLoaded, setLoaded }), [isLoaded])

  return (
    <AdaptivePageContext.Provider value={value}>
      {children}
    </AdaptivePageContext.Provider>
  )
}

export const useAdaptivePage = () => {
  return useContext(AdaptivePageContext)
}
