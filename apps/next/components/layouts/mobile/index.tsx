import dynamic from 'next/dynamic'
import { ActivityIndicator } from 'react-native'
import { Layout } from '../AdaptiveLayout'

const DynamicTabLayout = dynamic(() => import('./TabLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const DynamicInfoLayout = dynamic(() => import('./InfoLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

export const MobileTabLayout: Layout = (component) => (
  <DynamicTabLayout>{component}</DynamicTabLayout>
)

export const MobileInfoLayout: Layout = (component) => (
  <DynamicInfoLayout>{component}</DynamicInfoLayout>
)
