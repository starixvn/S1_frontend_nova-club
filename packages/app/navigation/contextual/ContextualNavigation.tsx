import { createContext, useState } from 'react'

interface ContextualStackItem {
  Component: React.FunctionComponent
  id: string
}

export const ContextualNavigationContext = createContext(
  [] as ContextualStackItem[]
)

interface ContextualNavigationProviderProps {
  children: React.ReactNode
}

const ContextualNavigationProvider = ({
  children,
}: ContextualNavigationProviderProps) => {
  const [stacks] = useState([] as ContextualStackItem[])

  return (
    <ContextualNavigationContext.Provider value={stacks}>
      {children}
    </ContextualNavigationContext.Provider>
  )
}

export default ContextualNavigationProvider
