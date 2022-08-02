import { View, Text } from 'react-native'
import React from 'react'
import useApppState from 'app/hooks/appState/useAppState'

interface AppProps {
  children?: React.ReactNode
}

const App = ({ children }: AppProps) => {
  useApppState()

  return <>{children}</>
}

export default App
