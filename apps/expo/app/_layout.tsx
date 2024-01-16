import { Provider } from 'app/provider'
import { Stack } from 'expo-router'

import notifee from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'
import CodePushProvider from 'app/provider/CodePushProvider'
import FontProvider from 'app/provider/FontProvider'

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

  return (
    <CodePushProvider>
      <FontProvider>
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
      </FontProvider>
    </CodePushProvider>
  )
}
