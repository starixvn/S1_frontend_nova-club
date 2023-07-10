import Header from 'agent/navigation/Header'
import AgentShareholderTab from 'agent/navigation/components/AgentTabNavigator/AgentShareholderTabs'
import AgentProvider from 'agent/provider'
import { View } from 'dripsy'
import React, { ReactElement } from 'react'
import NavigationLoading from './NavigationLoading'
import { AGENT_TAB_HEIGHT } from 'agent/constant/sizes'

const AgentLayout = (page: ReactElement) => {
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
        {page}
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
