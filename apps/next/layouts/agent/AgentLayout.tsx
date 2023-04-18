import Header from 'agent/navigation/Header'
import AgentShareholderTab from 'agent/navigation/components/AgentTabNavigator/AgentShareholderTabs'
import AgentProvider from 'agent/provider'
import { TAB_HEIGHT } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { View } from 'dripsy'
import React, { ReactElement, ReactNode, useEffect } from 'react'
import NavigationLoading from './NavigationLoading'

const AgentLayout = (page: ReactElement) => {
  useEffect(() => {
    //todo fix recreate of component which cause many other component to mount again
    console.log('recreate')
  }, [])
  return (
    <AgentProvider>
      <View
        sx={{
          paddingTop: TAB_HEIGHT * 2,
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
