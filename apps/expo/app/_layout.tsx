import { Provider } from 'app/provider'
import { Slot, Stack, useNavigation, useRouter } from 'expo-router'
import RootPage from './rootPage'
import { Platform } from 'react-native'

export default function Root() {
  // const router = useRouter()

  // if (Platform.OS === 'ios') {
  //   setTimeout(() => {
  //     router.replace('/')
  //   }, 1)
  // } else {
  //   setImmediate(() => {
  //     router.replace('/')
  //   })
  // }

  return (
    <Provider>
      <Stack
        screenOptions={{ header: () => null }}
        /* initialRouteName doesnt work on expo-rtouer 
        initialRouteName="splashscreen"
        */
      />
      {/* <RootPage /> */}
    </Provider>
  )
}
