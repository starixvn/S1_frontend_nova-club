import { Provider } from 'app/provider'
import { Stack } from 'expo-router'
import RootPage from './rootPage'
import { useFonts } from 'expo-font'

import { AvertaStdUseFont } from 'app/assets/fonts/Averta'
export default function Root() {
  const [loaded] = useFonts({
    ...AvertaStdUseFont,
  })

  if (!loaded) return null

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
