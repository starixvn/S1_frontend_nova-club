import AnnouncementSection from 'agent/components/Announcement/AnnouncementSection'
import Header from 'agent/navigation/Header'
import AgentShareholderTabBar from 'agent/navigation/components/AgentTabNavigator/AgentShareholderTabs'
import { MaterialTopTab } from 'app/navigation/navigator/MaterialTopTab'
import { Tabs } from 'expo-router'
import { View } from 'react-native'

export default function Root() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <MaterialTopTab
        tabBar={() => (
          <>
            <AgentShareholderTabBar />
            <AnnouncementSection />
          </>
        )}
        screenOptions={{
          lazy: true,
          swipeEnabled: false,
          tabBarIndicator: () => null,
          animationEnabled: false,
        }}
        //   sceneContainerStyle={{ backgroundColor: '#1E2238' }} // need to find ways to use dripsy, or move to packages/app
      />
    </View>
  )
}
