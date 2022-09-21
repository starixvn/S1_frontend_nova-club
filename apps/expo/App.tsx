import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { styled } from 'dripsy'
import { StatusBar } from 'expo-status-bar'
import 'react-native-gesture-handler'
import Branch from './integrations/branch/Branch'
// import Shield from './integrations/shield/Shield'
import * as Sentry from '@sentry/react-native'
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Shield from './integrations/shield/Shield'

Sentry.init({
  dsn: 'https://0782803d4b0a41ff9881ac3d5b4d9898@o1267442.ingest.sentry.io/6453774',
  // enableInExpoDevelopment: true,
  environment: 'production',
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

export default function App() {
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <ScrollView
        bounces={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <Provider>
          <Branch />
          <Shield />
          {/* StatusBar backgroundColor only affects Android, IOS refers to MainHeader */}
          <StatusBar backgroundColor="#0E2B46" style="light" />
          <NativeNavigation />
        </Provider>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const SB = styled(StatusBar)()
