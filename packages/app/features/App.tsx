import { View, Text } from 'react-native'
import React from 'react'
import useAppState from 'app/hooks/appState/useAppState'
import useOnAppStart from 'app/hooks/useOnAppStart'
interface AppProps {
  children?: React.ReactNode
}

const App = ({ children }: AppProps) => {
  useAppState()
  useOnAppStart()

  return <>{children}</>
}

export default App
