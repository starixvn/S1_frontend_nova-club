import useFontInit from 'app/hooks/useFontInit'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { styled } from 'dripsy'
import { StatusBar } from 'expo-status-bar'
import 'react-native-gesture-handler'
import Branch from './integrations/branch/Branch'

export default function App() {
  useFontInit()

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
