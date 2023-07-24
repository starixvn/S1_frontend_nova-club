import { AGENT_TAB_HEIGHT } from 'agent/constant/sizes'
import Header from 'agent/navigation/Header'
import AgentShareholderTab from 'agent/navigation/components/AgentTabNavigator/AgentShareholderTabs'
import AgentProvider from 'agent/provider'
import { View } from 'dripsy'
import { ReactNode } from 'react'
import NavigationLoading from './NavigationLoading'
import AnnouncementSection from 'agent/components/Announcement/AnnouncementSection'

const AgentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AgentProvider>
      <View
        sx={{
          paddingTop: AGENT_TAB_HEIGHT * 2,
          position: 'relative',
          backgroundColor: 'white',
          minHeight: '100dvh',
        }}
      >
        <HeaderFloat />
        <View sx={{ mb: 32 }} />
        {children}
        <NavigationLoading />
        <BottomTabFloat />
      </View>
    </AgentProvider>
  )
}

const HeaderFloat = ({}) => {
  return (
    <View
      sx={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        maxWidth: 'container',
        top: 0,
      }}
    >
      <Header />
      <AgentShareholderTab />
      <AnnouncementSection />
    </View>
  )
}

const BottomTabFloat = () => {
  return (
    <View
      sx={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        bottom: 0,
        maxWidth: 'container',
      }}
    >
      {/* <BottomNavigation /> */}
    </View>
  )
}

export default AgentLayout
