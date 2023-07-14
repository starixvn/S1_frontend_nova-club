import { View } from 'react-native'

import BottomTabBar from 'app/components/navigation/BottomTabBar'
import MainHeader from 'app/components/navigation/header/MainHeader'
import { Tabs, useNavigation } from 'expo-router'
import { useAppSelector } from 'app/provider/redux/store'

export default function Root() {
  const splashScreenLoaded = useAppSelector(
    (s) => s.tempSetting.splashScreenLoaded
  )

  return (
    <View style={{ flex: 1 }}>
      {splashScreenLoaded && <MainHeader />}
      <Tabs
        // tabBar={() => <BottomTabBar />}
        tabBar={() => (splashScreenLoaded ? <BottomTabBar /> : null)}
        screenOptions={{ header: (props) => null }}
        sceneContainerStyle={{ backgroundColor: '#1E2238' }} // need to find ways to use dripsy, or move to packages/app
      />
    </View>
  )
}
