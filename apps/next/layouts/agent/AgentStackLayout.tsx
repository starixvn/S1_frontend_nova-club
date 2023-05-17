import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import AgentProvider from 'agent/provider'
import {
  AGENT_STACK_CONTENT_PADDING,
  AGENT_STACK_CONTENT_PADDING_WEB,
  TAB_HEIGHT,
} from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { View, styled } from 'dripsy'
import React, { ComponentProps, FC } from 'react'
import { Platform } from 'react-native'
import NavigationLoading from './NavigationLoading'

export type TabLayoutProps = {
  children: React.ReactElement
} & ComponentProps<typeof View>

const StyledView = styled(View)(({ height }: { height: number }) => ({
  paddingTop: AGENT_STACK_CONTENT_PADDING_WEB,
  minHeight: height,
  bg: 'white',
}))

const AgentStackLayout: FC<TabLayoutProps> = ({ children, ...props }) => {
  const { height } = useContainerDimension()

  return (
    <AgentProvider>
      <StyledView {...props} height={height}>
        {children}
        <NavigationLoading />
      </StyledView>
    </AgentProvider>
  )
}

export default AgentStackLayout
