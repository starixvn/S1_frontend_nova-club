import { PortalProvider } from '@gorhom/portal'
import RootModal from 'app/components/modal/RootModal'
import RootToast from 'app/components/RootToast'
import App from 'app/features/App'
import GameLauncher from 'app/features/games/GameLauncher'
import ContextualNavigationProvider from 'app/navigation/web/ContextualNavigation'
import { styled } from 'dripsy'
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
