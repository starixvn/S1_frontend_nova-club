import { AdaptivePageProvider } from 'components/context/AdaptivePageContext'
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

const DynamicDepositLayout = dynamic(() => import('./DepositLayout'), {
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

const DynammicRewardLayout = dynamic(() => import('./RewardLayout'), {
  loading: () => <AdaptiveLayoutLoader />,
  ssr: false,
})

export const DesktopBaseLayout: Layout = (component) => (
  <AdaptivePageProvider>
    <DynamicBaseLayout>{component}</DynamicBaseLayout>
  </AdaptivePageProvider>
)

export const DesktopWalletLayout: Layout = (component) =>
  DesktopBaseLayout(<DynamicWalletLayout>{component}</DynamicWalletLayout>)

export const DesktopDepositLayout: Layout = (component) =>
  DesktopBaseLayout(
    <DynamicWalletLayout>
      <DynamicDepositLayout>{component}</DynamicDepositLayout>
    </DynamicWalletLayout>
  )

export const DesktopAccountLayout: Layout = (component) =>
  DesktopBaseLayout(<DynamicAccountLayout>{component}</DynamicAccountLayout>)

export const DesktopLeaderboardLayout: Layout = (component) =>
  DesktopBaseLayout(
    <DynamicLeaderboardLayout>{component}</DynamicLeaderboardLayout>
  )

export const DesktopInfoLayout: Layout = (component) =>
  DesktopBaseLayout(<DynamicInfoLayout>{component}</DynamicInfoLayout>)

export const DesktopRewardLayout: Layout = (component, props) =>
  DesktopBaseLayout(
    <DynammicRewardLayout {...props}>{component}</DynammicRewardLayout>
  )

export const EmptyLayout: Layout = (component) => <>{component}</>
