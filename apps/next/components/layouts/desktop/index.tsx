import dynamic from 'next/dynamic'
import { ActivityIndicator } from 'react-native'
import { Layout } from '../AdaptiveLayout'

const DynamicBaseLayout = dynamic(() => import('./BaseLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const DynamicWalletLayout = dynamic(() => import('./WalletLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const DynamicAccountLayout = dynamic(() => import('./AccountLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const DynamicLeaderboardLayout = dynamic(() => import('./LeaderboardLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const DynamicInfoLayout = dynamic(() => import('./InfoLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

export const DesktopBaseLayout: Layout = (component) => (
  <DynamicBaseLayout>{component}</DynamicBaseLayout>
)

export const DesktopWalletLayout: Layout = (component) => (
  <DynamicBaseLayout>
    <DynamicWalletLayout>{component}</DynamicWalletLayout>
  </DynamicBaseLayout>
)

export const DesktopAccountLayout: Layout = (component) => (
  <DynamicBaseLayout>
    <DynamicAccountLayout>{component}</DynamicAccountLayout>
  </DynamicBaseLayout>
)

export const DesktopLeaderboardLayout: Layout = (component) => (
  <DynamicBaseLayout>
    <DynamicLeaderboardLayout>{component}</DynamicLeaderboardLayout>
  </DynamicBaseLayout>
)

export const DesktopInfoLayout: Layout = (component) => (
  <DynamicBaseLayout>
    <DynamicInfoLayout>{component}</DynamicInfoLayout>
  </DynamicBaseLayout>
)
