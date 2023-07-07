import LanguageSwitch from 'app/components/LanguageSwitch'
import Screen from 'app/components/layouts/Screen'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'
import ProfileBalanceSummary from './ProfileBalanceSummary'
import ProfileHeader from './ProfileHeader'
import ProfileOverviewCard from './ProfileOverviewCard'
import ProfileQuickNavigation from './ProfileQuickNavigation'
import WalletButton from './WalletButton'

export default function ProfileScreen() {
  const { bottom } = useSafeArea()
  const { height, width } = useWindowDimensions()

  const { data: playerData, currency } = usePlayerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const { data, isFetching } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  return (
    <Screen
      contentContainerSx={{
        alignItems: 'center',
        minHeight: height + bottom,
        paddingBottom: bottom,
        justifyContent: 'space-between',
      }}
    >
      <View sx={{ alignItems: 'center', width }}>
        <ProfileHeader data={playerData} />
        <ProfileBalanceSummary
          cash={data?.totalBalance ?? 0}
          reward={data?.totalReward ?? 0}
          isLoading={isFetching}
          currency={currency}
        />
        <WalletButton />
        <ProfileOverviewCard currency={currency} />
        <ProfileQuickNavigation />
      </View>
      <View sx={{ width, height: 100 }} />
      <View>
        <LanguageSwitch />
      </View>
    </Screen>
  )
}
