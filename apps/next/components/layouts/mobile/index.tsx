import dynamic from 'next/dynamic'
import { ActivityIndicator } from 'react-native'
import { Layout } from '../AdaptiveLayout'

const DynamicTabLayout = dynamic(() => import('./TabLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

export const MobileTabLayout: Layout = (component) => (
  <DynamicTabLayout>{component}</DynamicTabLayout>
)
