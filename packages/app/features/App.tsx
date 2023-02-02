import useOnAgentAppStart from 'agent/hooks/useOnAgentAppStart'
import useAppState from 'app/hooks/appState/useAppState'
import useOnAppStart from 'app/hooks/useOnAppStart'
import React from 'react'

interface AppProps {
  children?: React.ReactNode
}

const App = ({ children }: AppProps) => {
  useAppState()
  useOnAppStart()
  useOnAgentAppStart()

  return <>{children}</>
}

export default App
