import dynamic from 'next/dynamic'
import { Layout } from '../AdaptiveLayout'
import AdaptiveLayoutLoader from '../AdaptiveLayoutLoader'

const DynamicBaseLayout = dynamic(() => import('./BaseLayout'), {
  loading: () => <AdaptiveLayoutLoader />,
  ssr: false,
})

const DynamicWalletLayout = dynamic(() => import('./WalletLayout'), {
  loading: () => <AdaptiveLayoutLoader />,
  ssr: false,
})

const DynamicAccountLayout = dynamic(() => import('./AccountLayout'), {
  loading: () => <AdaptiveLayoutLoader />,
  ssr: false,
})

const DynamicLeaderboardLayout = dynamic(() => import('./LeaderboardLayout'), {
  loading: () => <AdaptiveLayoutLoader />,
  ssr: false,
})

const DynamicInfoLayout = dynamic(() => import('./InfoLayout'), {
  loading: () => <AdaptiveLayoutLoader />,
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
