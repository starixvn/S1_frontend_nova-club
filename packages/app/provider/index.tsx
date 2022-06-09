import { PortalProvider } from '@gorhom/portal'
import AlertModal from 'app/components/modal/AlertModal'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Dripsy } from './dripsy'
import { LocalizationProviderRedux } from './localization'
import { NavigationProvider } from './navigation'
import ReduxProvider from './redux'
import { SafeArea } from './safe-area'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider>
        <LocalizationProviderRedux>
          <SafeArea>
            <NavigationProvider>
              <Dripsy>
                <PortalProvider>{children}</PortalProvider>
                <AlertModal />
              </Dripsy>
            </NavigationProvider>
          </SafeArea>
        </LocalizationProviderRedux>
      </ReduxProvider>
    </GestureHandlerRootView>
  )
}
