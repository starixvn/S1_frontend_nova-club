import useAppState from 'app/hooks/appState/useAppState'
import useOnAppStart from 'app/hooks/useOnAppStart'
import React from 'react'

interface AppProps {
  children?: React.ReactNode
}

const App = ({ children }: AppProps) => {
  useAppState()
  useOnAppStart()

  return <>{children}</>
}

export default App
