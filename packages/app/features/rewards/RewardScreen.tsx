import LazyIndicator from 'app/components/LazyIndicator'
import RewardRoutes from 'desktop-ext/routes/rewardRoutes'
import dynamic from 'next/dynamic'
import React from 'react'
import { createParam } from 'solito'

export const DynamicRewardList = dynamic(
  () => import('app/features/rewards/List/RewardGameList'),
  {
    loading: () => <LazyIndicator />,
    ssr: false,
  }
)
export const DynamicHow = dynamic(() => import('app/features/rewards/How'), {
  loading: () => <LazyIndicator />,
  ssr: false,
})
export const DynamicRules = dynamic(
  () => import('app/features/rewards/Rules'),
  {
    loading: () => <LazyIndicator />,
    ssr: false,
  }
)

const TabBarLayout = {
  parentFlex: [1, 1, 0],
  childMinWidth: [0, 0, 100],
}

const { useParam } = createParam<{ tab: string }>()
const RewardsHubScreen = () => {
  const [tab = RewardRoutes[0].key] = useParam('tab')

  switch (tab) {
    // case RewardRoutes[1].key:
    //   return <DynamicHow />
    case RewardRoutes[1].key:
      return <DynamicRules />
    default:
      return <DynamicRewardList />
  }
}

export default RewardsHubScreen
