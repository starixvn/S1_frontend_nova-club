import useFontInit from 'app/hooks/useFontInit'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { styled } from 'dripsy'
import { StatusBar } from 'expo-status-bar'
import 'react-native-gesture-handler'
import Branch from './integrations/branch/Branch'
import * as Sentry from 'sentry-expo'

Sentry.init({
  dsn: 'https://0782803d4b0a41ff9881ac3d5b4d9898@o1267442.ingest.sentry.io/6453774',
  enableInExpoDevelopment: true,
  environment: 'staging',
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

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
