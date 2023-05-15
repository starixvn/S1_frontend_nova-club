import LanguageSwitch from 'app/components/LanguageSwitch'
import Screen from 'app/components/layouts/Screen'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Currency } from 'app/utils/constant'
import React, { useMemo } from 'react'
import { usePlayerProfileQuery } from '../../../services/playerApi'
import { usePlayerBalanceQuery } from '../../../services/walletApi'
import ProfileBalanceSummary from './profile/ProfileBalanceSummary'
import ProfileOverviewCard from './profile/ProfileOverviewCard'
import ProfileQuickNavigation from './profile/ProfileQuickNavigation'
import WalletButton from './profile/WalletButton'
import ProfileHeader from './profile/ProfileHeader'
import { useWindowDimensions } from 'react-native'
import { View } from 'dripsy'

export default function ProfileScreen() {
  const { top, bottom } = useSafeArea()
  const { height, width } = useWindowDimensions()
  const { token } = useAppSelector((state) => state.auth.info) || {}

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

  const { isFetching, wallets } = usePlayerBalanceQuery(undefined, {
    selectFromResult: (s) => ({
      ...s,
      wallets: s.data?.data,
    }),
  })

  const walletInfo = useMemo(() => {
    const sum = {
      cash: 0,
      reward: 0,
    }

    if (wallets)
      Object.values(wallets).forEach((v) => {
        sum.cash += v.balance ? Number(v.balance) : 0
        sum.reward += v.reward ? Number(v.reward) : 0
      })

    return sum
  }, [wallets])

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
          cash={walletInfo.cash}
          reward={walletInfo.reward}
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
