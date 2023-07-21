import LanguageSwitch from 'app/components/LanguageSwitch'
import Screen from 'app/components/layouts/Screen'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import React from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'
import ProfileBalanceSummary from './ProfileBalanceSummary'
import ProfileHeader from './ProfileHeader'
import ProfileOverviewCard from './ProfileOverviewCard'
import ProfileQuickNavigation from './ProfileQuickNavigation'
import WalletButton from './WalletButton'
import { HEADER_HEIGHT } from 'app/utils/constant'

export default function ProfileScreen() {
  const { bottom, top } = useSafeArea()
  const { height, width } = useWindowDimensions()

  const { data: playerData, currency } = usePlayerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const { data, isFetching } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const profileHeaderHeight = HEADER_HEIGHT + (top ? top : 30)

  return (
    <>
      <ProfileHeader data={playerData} height={profileHeaderHeight} />
      <Screen
        contentContainerSx={{
          alignItems: 'center',
          minHeight: height - HEADER_HEIGHT - profileHeaderHeight + bottom,
          paddingBottom: bottom + 25,
          justifyContent: 'space-between',
          marginTop: Platform.OS === 'web' ? profileHeaderHeight : 0,
        }}
      >
        <View sx={{ alignItems: 'center', width }}>
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
        <View sx={{ flex: 1, justifyContent: 'flex-end' }}>
          <LanguageSwitch />
        </View>
      </Screen>
    </>
  )
}
