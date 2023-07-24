import dynamic from 'next/dynamic'
import { ActivityIndicator } from 'react-native'
import { Layout } from '../AdaptiveLayout'

const DynamicTabLayout = dynamic(() => import('./AgentLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const DynamicStackTabLayout = dynamic(() => import('./AgentStackLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

export const MobileAgentLayout: Layout = (component) => (
  <DynamicTabLayout>{component}</DynamicTabLayout>
)
export const MobileStackAgentLayout: Layout = (component) => (
  <DynamicStackTabLayout>{component}</DynamicStackTabLayout>
)
