import HomeScreen from 'app/features/home/HomeScreen'
import { useAppSelector } from 'app/provider/redux/store'
import { Redirect, useNavigation, useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function MemberScreen(props) {
  const splashScreenLoaded = useAppSelector(
    (s) => s.tempSetting.splashScreenLoaded
  )

  const router = useRouter()

  useEffect(() => {
    /* https://github.com/expo/router/issues/740 */
    if (!splashScreenLoaded)
      setTimeout(() => router.replace('/splashscreen'), 1)
  }, [splashScreenLoaded])

  if (!splashScreenLoaded) return null

  return <HomeScreen />
}
