import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import AgentProvider from 'agent/provider'
import { TAB_HEIGHT } from 'app/constant/sizes'
import { View } from 'dripsy'
import React, { FC } from 'react'
import NavigationLoading from './NavigationLoading'

export type TabLayoutProps = {
  children: React.ReactElement
  lockHeight?: boolean
}

const AgentStackLayout: FC<TabLayoutProps> = ({ children, lockHeight }) => {
  return (
    <AgentProvider>
      <View
        sx={{
          paddingTop: TAB_HEIGHT,
          position: 'relative',
          backgroundColor: 'rgb(224,237,254)',
        }}
      >
        <HeaderFloat />
        {children}
        <NavigationLoading />
        {/* <BottomTabFloat /> */}
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
      {/* <Header /> */}
      <CommonBackHeader />
      {/* <AgentShareholderTab /> */}
    </View>
  )
}

export default AgentStackLayout
