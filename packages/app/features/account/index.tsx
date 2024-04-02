import LanguageSwitch from 'app/components/LanguageSwitch'
import Screen from 'app/components/layouts/Screen'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import React from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useGetCoinQuery } from 'services/rewardApi'
import { usePlayerBalanceQuery } from 'services/walletApi'
import { Currency, HEADER_HEIGHT } from 'utils/constant'
import ProfileBalanceSummary from './ProfileBalanceSummary'
import ProfileHeader from './ProfileHeader'
import ProfileOverviewCard from './ProfileOverviewCard'
import ProfileQuickNavigation from './ProfileQuickNavigation'
import WalletButton from './WalletButton'

export default function ProfileScreen() {
  const { bottom, top } = useSafeArea()
  const { height, width } = useWindowDimensions()

  const { data: playerData } = usePlayerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const { data: rewardsCoin } = useGetCoinQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const currency = useAppSelector((state) => state.setting.currency)

  const { data, isFetching } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const profileHeaderHeight = HEADER_HEIGHT + (top ? top + 15 : 40)

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
            reward={rewardsCoin ?? 0}
            isLoading={isFetching}
            currency={currency as Currency}
          />
          <WalletButton />
          <ProfileOverviewCard currency={currency as Currency} />
          <ProfileQuickNavigation />
        </View>
        <View sx={{ flex: 1, justifyContent: 'flex-start', pt: '$3' }}>
          <LanguageSwitch />
        </View>
      </Screen>
    </>
  )
}
