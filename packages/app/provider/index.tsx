import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'
import ReduxProvider from './redux'
import { SafeArea } from './safe-area'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider>
        <SafeArea>
          <NavigationProvider>
            <Dripsy>{children}</Dripsy>
          </NavigationProvider>
        </SafeArea>
      </ReduxProvider>
    </GestureHandlerRootView>
  )
}
