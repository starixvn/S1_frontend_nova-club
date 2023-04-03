import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import AgentProvider from 'agent/provider'
import {
  AGENT_STACK_CONTENT_PADDING,
  AGENT_STACK_CONTENT_PADDING_WEB,
  TAB_HEIGHT,
} from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { View } from 'dripsy'
import React, { FC } from 'react'
import { Platform } from 'react-native'
import NavigationLoading from './NavigationLoading'

export type TabLayoutProps = {
  children: React.ReactElement
  lockHeight?: boolean
}

const AgentStackLayout: FC<TabLayoutProps> = ({ children, lockHeight }) => {
  const { height } = useContainerDimension()

  return (
    <AgentProvider>
      <View
        sx={{
          paddingTop: AGENT_STACK_CONTENT_PADDING_WEB,
          minHeight: height,
          bg: 'white',
        }}
      >
        {children}
        <NavigationLoading />
      </View>
    </AgentProvider>
  )
}

export default AgentStackLayout
