import SessionHandler from 'app/components/SessionHandler'
import BottomTabBar from 'app/components/navigation/BottomTabBar'
import MainHeader from 'app/components/navigation/header/MainHeader'
import DraggableFloatingEuroCup from 'app/features/floatingContent/DraggableFloatingEuroCup'
import DraggableFloatingMystery from 'app/features/floatingContent/DraggableFloatingMystery'
import { useAppSelector } from 'app/provider/redux/store'
import { Tabs } from 'expo-router'
import { View } from 'react-native'

export default function Root() {
  const splashScreenLoaded = useAppSelector(
    (s) => s.tempSetting.splashScreenLoaded
  )

  return (
    <View style={{ flex: 1 }}>
      {splashScreenLoaded && (
        <>
          <SessionHandler />
          <MainHeader />
          {/** APP floating mystery */}
          <DraggableFloatingEuroCup />
          <DraggableFloatingMystery />
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
