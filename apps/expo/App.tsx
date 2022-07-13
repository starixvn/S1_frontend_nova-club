import useFontInit from 'app/hooks/useFontInit'
import 'react-native-gesture-handler'

import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { styled } from 'dripsy'
import { fontName } from 'app/provider/dripsy'

export default function App() {
  /**
   * WIP
   * Should put into splashscreen
   */
  const [loaded] = useFontInit({
    fontFamily: {
      [fontName]: require('app/assets/fonts/HelveticaNeue.ttf'),
    },
  })

  if (!loaded) {
    return <Text>Nothing here</Text>
  }
  /*********** */

  return (
    <Provider>
      {/* StatusBar backgroundColor only affects Android, IOS refers to MainHeader */}
      <StatusBar backgroundColor="#0E2B46" style="light" />
      <NativeNavigation />
    </Provider>
  )
}

const SB = styled(StatusBar)()
