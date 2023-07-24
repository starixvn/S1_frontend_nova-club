import Header from 'agent/navigation/Header'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import AgentShareholderTabBar from 'agent/navigation/components/AgentTabNavigator/AgentShareholderTabs'
import AnnouncementSection from 'agent/components/Announcement/AnnouncementSection'

export default function Root() {
  return (
    <View style={{ flex: 1 }}>
      {/* <Header /> */}
      {/* <AgentShareholderTabBar /> */}
      {/* <AnnouncementSection /> */}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  )
}
