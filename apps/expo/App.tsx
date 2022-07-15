import useFontInit from 'app/hooks/useFontInit'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { fontName } from 'app/provider/dripsy'
import { styled } from 'dripsy'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import 'react-native-gesture-handler'
import Branch from './integrations/branch/Branch'

export default function App() {
  /**
   * WIP
   * Should put into splashscreen
   */
  const [loaded] = useFontInit({
    fontFamily: {
      [fontName]: require('app/assets/fonts/HelveticaNeue.ttf'),
    },
    iconUrl: {
      uri:
        // 'http://192.168.71.119:3000/fonts/icomoon.ttf',
        'https://stage.gball8.com/fonts/icomoon.ttf',
    },
  })

  if (!loaded) {
    return (
      <Text style={{ color: 'black', marginTop: 30 }}>
        Loading Font... This process will be moved to splash screen
      </Text>
    )
  }
  /*********** */

  return (
    <Provider>
      <Branch />
      {/* StatusBar backgroundColor only affects Android, IOS refers to MainHeader */}
      <StatusBar backgroundColor="#0E2B46" style="light" />
      <NativeNavigation />
    </Provider>
  )
}

const SB = styled(StatusBar)()
