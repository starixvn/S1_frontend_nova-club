import { Provider } from 'app/provider'
import { Stack } from 'expo-router'

import messaging from '@react-native-firebase/messaging'
import notifee from '@notifee/react-native'
import useNotification from 'app/hooks/notification/useNotification'

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage)
})

notifee.onBackgroundEvent(async ({ type, detail }) => {
  // no op
})

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

  useNotification()

  return (
    <Provider>
      <Stack
        screenOptions={{ headerShown: false }}
        /* initialRouteName doesnt work on expo-rtouer 
        initialRouteName="splashscreen"
        */
      >
        <Stack.Screen name="(Member)" />
      </Stack>
    </Provider>
  )
}
