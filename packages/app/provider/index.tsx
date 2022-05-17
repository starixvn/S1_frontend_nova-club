import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationProvider>
        <Dripsy>{children}</Dripsy>
      </NavigationProvider>
    </GestureHandlerRootView>
  )
}
