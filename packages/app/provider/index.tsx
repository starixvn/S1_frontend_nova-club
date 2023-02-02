import { PortalProvider } from '@gorhom/portal'
import RootToast from 'app/components/RootToast'
import App from 'app/features/App'
import GameLauncher from 'app/features/games/GameLauncher'
import useNotification from 'app/hooks/notification/useNotification'
import ContextualNavigationProvider from 'app/navigation/contextual/ContextualNavigation'
import { styled } from 'dripsy'
import { useKeepAwake } from 'expo-keep-awake'
import { Platform } from 'react-native'
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
  maxWidth: Platform.OS === 'web' ? 'container' : '100%',
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
                    <App />
                    <RootToast />
                    {/* <SnowFall /> */}
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
