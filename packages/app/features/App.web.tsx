import useOnAgentAppStart from 'agent/hooks/useOnAgentAppStart'
import useOnAppStart from 'app/hooks/useOnAppStart'
import React from 'react'

interface AppProps {
  children?: React.ReactNode
}

const App = ({ children }: AppProps) => {
  useOnAppStart()
  useOnAgentAppStart()

  return <>{children}</>
}

export default App
