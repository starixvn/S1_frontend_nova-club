import useFontInit from 'app/hooks/useFontInit'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { Text } from 'react-native'

export default function App() {
  /**
   * WIP
   * Should put into splashscreen
   */
  const [loaded] = useFontInit()

  if (!loaded) {
    return <Text>Nothing here</Text>
  }
  /*********** */

  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}
