import { View } from 'react-native'

import BottomTabBar from 'app/components/navigation/BottomTabBar'
import MainHeader from 'app/components/navigation/header/MainHeader'
import { Tabs } from 'expo-router'

export default function Root() {
  return (
    <View style={{ flex: 1 }}>
      <MainHeader />
      <Tabs
        tabBar={() => <BottomTabBar />}
        screenOptions={{ header: (props) => null }}
        sceneContainerStyle={{ backgroundColor: '#1E2238' }} // need to find ways to use dripsy, or move to packages/app
      />
    </View>
  )
}
