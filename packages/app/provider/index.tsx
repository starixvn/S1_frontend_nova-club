import { PortalProvider } from '@gorhom/portal'
import RootModal from 'app/components/modal/RootModal'
import RootToast from 'app/components/RootToast'
import App from 'app/features/App'
import GameLauncher from 'app/features/games/GameLauncher'
import useNotification from 'app/hooks/notification/useNotification'
import ContextualNavigationProvider from 'app/navigation/web/ContextualNavigation'
import { styled, View } from 'dripsy'
import { useKeepAwake } from 'expo-keep-awake'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Dripsy } from './dripsy'
import { LocalizationProviderRedux } from './localization'
import ModalProvider from './modal'
import { NavigationProvider } from './navigation'
import ReduxProvider from './redux'
import { SafeArea } from './safe-area'

const RootView = styled(GestureHandlerRootView)(() => ({
  flex: 1,
  width: '100%',
  maxWidth: 'container',
  overflow: 'hidden',
  marginLeft: 'auto',
  marginRight: 'auto',
}))

export function Provider({ children }: { children: React.ReactNode }) {
  useKeepAwake()
  useNotification()

  return (
    <Dripsy>
      <RootView>
        <ReduxProvider>
          <LocalizationProviderRedux>
            <SafeArea>
              <NavigationProvider>
                <ModalProvider>
                  <ContextualNavigationProvider>
                    <PortalProvider>{children}</PortalProvider>
                    <GameLauncher />
                    <RootModal />
                    <App />
                    <RootToast />
                  </ContextualNavigationProvider>
                </ModalProvider>
              </NavigationProvider>
            </SafeArea>
          </LocalizationProviderRedux>
        </ReduxProvider>
      </RootView>
    </Dripsy>
  )
}
