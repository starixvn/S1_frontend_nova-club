import { AGENT_STACK_CONTENT_PADDING_WEB } from 'agent/constant/sizes'
import AgentProvider from 'agent/provider'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { View, styled } from 'dripsy'
import React, { ComponentProps, FC } from 'react'
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
