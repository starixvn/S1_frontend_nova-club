import dynamic from 'next/dynamic'
import { ActivityIndicator } from 'react-native'

export const DesktopBaseLayout = dynamic(() => import('./BaseLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

export const DesktopWalletLayout = dynamic(() => import('./WalletLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

export const DesktopAccountLayout = dynamic(() => import('./AccountLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

export const DesktopLeaderboardLayout = dynamic(
  () => import('./LeaderboardLayout'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)
