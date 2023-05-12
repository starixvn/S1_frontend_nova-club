import { Provider } from 'app/provider'
import { Stack } from 'expo-router'
import RootPage from './rootPage'

export default function Root() {
  return (
    <Provider>
      <Stack
        screenOptions={{ header: () => null }}

        /* initialRouteName doesnt work on expo-rtouer 
        initialRouteName="splashscreen"
        */
      />
      <RootPage />
    </Provider>
  )
}
