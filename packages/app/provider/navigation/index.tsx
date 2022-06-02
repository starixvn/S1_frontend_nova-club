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
              SplashScreen: 'SplashScreen',
              BottomNav: 'BottomNav',
              Home: 'home',
              Sportsbook: 'sportsbook/:name',
              Games: '/games/:name',
              Slots: '/slots/:name',
              Casino: '/live/:name',
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
