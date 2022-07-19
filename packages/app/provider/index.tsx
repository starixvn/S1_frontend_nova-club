import { PortalProvider } from '@gorhom/portal'
import AlertModal from 'app/components/modal/AlertModal'
import GameLauncher from 'app/features/games/GameLauncher'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Dripsy } from './dripsy'
import { LocalizationProviderRedux } from './localization'
import ModalProvider from './modal'
import { NavigationProvider } from './navigation'
import ReduxProvider from './redux'
import { SafeArea } from './safe-area'
import { useKeepAwake } from 'expo-keep-awake'
import ContextualNavigationProvider from 'app/navigation/web/ContextualNavigation'

export function Provider({ children }: { children: React.ReactNode }) {
  useKeepAwake()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider>
        <LocalizationProviderRedux>
          <SafeArea>
            <NavigationProvider>
              <Dripsy>
                <ModalProvider>
                  <ContextualNavigationProvider>
                    <PortalProvider>{children}</PortalProvider>
                    <GameLauncher />
                    <AlertModal />
                  </ContextualNavigationProvider>
                </ModalProvider>
              </Dripsy>
            </NavigationProvider>
          </SafeArea>
        </LocalizationProviderRedux>
      </ReduxProvider>
    </GestureHandlerRootView>
  )
}
