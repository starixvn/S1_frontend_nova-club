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
      <View sx={{ paddingTop: TAB_HEIGHT / 2 }}>
        {children}
        <NavigationLoading />
      </View>
    </AgentProvider>
  )
}

export default AgentStackLayout
