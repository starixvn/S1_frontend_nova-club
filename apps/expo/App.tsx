import useFontInit from 'app/hooks/useFontInit'
import 'react-native-gesture-handler'

import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import useOnAppStart from 'app/hooks/useOnAppStart'

export default function App() {
  /**
   * WIP
   * Should put into splashscreen
   */
  const [loaded] = useFontInit()
  useOnAppStart()

  if (!loaded) {
    return <Text>Nothing here</Text>
  }
  /*********** */

  return (
    <Provider>
      <StatusBar backgroundColor="$background" />
      <NativeNavigation />
    </Provider>
  )
}
