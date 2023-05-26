import { View } from 'react-native'

import BottomTabBar from 'app/components/navigation/BottomTabBar'
import DrawerProvider from 'app/components/navigation/Drawer/DrawerProvider'
import { Tabs } from 'expo-router'
import MainHeader from 'app/components/navigation/Header/MainHeader'

export default function Root() {
  return (
    <DrawerProvider>
      <View style={{ flex: 1 }}>
        <MainHeader />
        <Tabs
          tabBar={() => <BottomTabBar />}
          screenOptions={{ header: (props) => null }}
          sceneContainerStyle={{ backgroundColor: '#1E2238' }} // need to find ways to use dripsy, or move to packages/app
        />
      </View>
    </DrawerProvider>
  )
}
