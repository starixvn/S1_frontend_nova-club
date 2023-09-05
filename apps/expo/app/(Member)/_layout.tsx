import SessionHandler from 'app/components/SessionHandler'
import BottomTabBar from 'app/components/navigation/BottomTabBar'
import TutorialScreen from 'app/components/navigation/TutorialScreen'
import MainHeader from 'app/components/navigation/header/MainHeader'
import { useAppSelector } from 'app/provider/redux/store'
import { Tabs } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default function Root() {
  const splashScreenLoaded = useAppSelector(
    (s) => s.tempSetting.splashScreenLoaded
  )
  const token = useAppSelector((s) => s.auth.info?.token)
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const showTutorial = useAppSelector((s) => s.setting.triggerPopupTutorial)

  const [showAfterDelay, setShowAfterDelay] = useState(false)

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setShowAfterDelay(true)
    }, 500)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [isLoggedIn, showTutorial])

  return (
    <View style={{ flex: 1 }}>
      {splashScreenLoaded && (
        <>
          <SessionHandler />
          <MainHeader />
          {isLoggedIn && showTutorial && showAfterDelay && <TutorialScreen />}
        </>
      )}
      <Tabs
        // tabBar={() => <BottomTabBar />}
        tabBar={() => (splashScreenLoaded ? <BottomTabBar /> : null)}
        screenOptions={{ header: (props) => null }}
        sceneContainerStyle={{ backgroundColor: '#1E2238' }} // need to find ways to use dripsy, or move to packages/app
      />
    </View>
  )
}
