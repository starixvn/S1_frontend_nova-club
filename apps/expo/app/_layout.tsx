import { Provider } from 'app/provider'
import { Stack, Tabs } from 'expo-router'
import { Text } from 'react-native'

export default function Root() {
  return (
    <Provider>
      <Stack
        screenOptions={{ header: () => null }}

        /* initialRouteName doesnt work on expo-rtouer 
        initialRouteName="splashscreen"
        */
      />
    </Provider>
  )
}
