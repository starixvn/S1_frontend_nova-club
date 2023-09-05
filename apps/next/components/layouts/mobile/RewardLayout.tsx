import { Image, Row, Text, View } from 'dripsy'
import { ReactNode } from 'react'
import RewardsTabBar from 'app/features/rewards/components/RewardsTabBar'
import RewardsHeader from 'app/features/rewards/components/RewardsHeader'
import dynamic from 'next/dynamic'
import LazyIndicator from 'app/components/LazyIndicator'
import Header from 'app/components/common/Header'
import { HEADER_HEIGHT } from 'utils/constant'
import { useGetCoinQuery } from 'services/rewardApi'
import { FONT_TOP_OFFSET } from 'app/constants/font'

export const DynamicRewardList = dynamic(
  () => import('app/features/rewards/List/RewardGameList'),
  {
    loading: () => <LazyIndicator />,
    ssr: false,
  }
)

export default function RewardLayout({ children }: { children: ReactNode }) {
  return (
    <View>
      <FixedHeader />
      <View sx={{ paddingTop: HEADER_HEIGHT * 2 + 1 }}>{children}</View>
    </View>
  )
}

function FixedHeader({}) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2 }}>
      <RewardsHeader />
      <RewardsTabBar />
    </div>
  )
}
