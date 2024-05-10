import SessionHandler from 'app/components/SessionHandler'
import BottomTabBar from 'app/components/navigation/BottomTabBar'
import MainHeader from 'app/components/navigation/header/MainHeader'
import { useAppSelector } from 'app/provider/redux/store'
import { Tabs } from 'expo-router'
import { View } from 'react-native'
import DraggableFloatingMystery from 'app/features/floatingContent/DraggableFloatingMystery'
import FloatingEuroCup from 'app/features/floatingContent/FloatingEuroCup'

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
          <View
            style={{ position: 'absolute', bottom: 270, right: 24, zIndex: 2 }}
          >
            <FloatingEuroCup />
          </View>
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
