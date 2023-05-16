import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

import BottomTabBar from 'app/components/navigation/BottomTabBar'
import MainHeader from 'app/components/navigation/Header/MainHeader'
import { Tabs } from 'expo-router'
import DrawerProvider from 'app/components/navigation/Drawer/DrawerProvider'

export default function Root() {
  return (
    <DrawerProvider>
      <View style={{ flex: 1 }}>
        <Tabs
          tabBar={() => <BottomTabBar />}
          screenOptions={{ header: () => <MainHeader /> }}
          sceneContainerStyle={{ backgroundColor: '#1E2238' }} // need to find ways to use dripsy, or move to packages/app
        />
      </View>
    </DrawerProvider>
  )
}
