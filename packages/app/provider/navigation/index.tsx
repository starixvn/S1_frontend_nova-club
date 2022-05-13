import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: ['http://localhost:3000'],
          config: {
            screens: {
              Home: 'home',
              Test: 'test/:name',
              Test2: '/games/:name',
              Test3: '/slots/:name',
              Test4: '/live/:name',
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
