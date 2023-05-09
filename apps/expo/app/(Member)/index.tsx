import { Text } from 'react-native'
import { Redirect } from 'expo-router'
import { createParam } from 'solito'

const { useParam } = createParam()

export default function MemberScreen(props) {
  const [isFromSplashscreen] = useParam('splashscreen')
  /* Expo-router not able to use initial path and we require to map home page to "/" */
  if (!isFromSplashscreen) {
    console.log('redirect to splashscreen')
    return <Redirect href="/splashscreen" />
  }

  return null
}
