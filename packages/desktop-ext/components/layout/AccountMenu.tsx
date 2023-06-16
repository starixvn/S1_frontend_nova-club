import ProfileBalanceSummary from 'app/features/account/ProfileBalanceSummary'
import ProfileHeaderCard from 'app/features/account/ProfileHeaderCard'
import ProfileOverviewCard from 'app/features/account/ProfileOverviewCard'
import { useAppSelector } from 'app/provider/redux/store'
import { Currency } from 'app/utils/constant'
import { View } from 'dripsy'
import React, { useMemo } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'

export const ACCOUNT_MENU_HEIGHT = 160 // can remove this if the component inside can have dynamic height
export default function AccountMenu({}) {
  const { token } = useAppSelector((state) => state.auth.info) || {}

  const { data: playerData } = usePlayerProfileQuery(undefined, {
    skip: !token,
  })
  const currency = playerData?.currency as Currency

  const { isFetching, wallets } = usePlayerBalanceQuery(undefined, {
    selectFromResult: (s) => ({
      ...s,
      wallets: s.data?.data,
    }),
    skip: !token,
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
    <View
      sx={{
        height: ACCOUNT_MENU_HEIGHT,
        width: '100%',
        borderRadius: 15,
        bg: '$primary.200',
        my: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <ProfileHeaderCard data={playerData} />
      <ProfileBalanceSummary
        cash={walletInfo.cash}
        reward={walletInfo.reward}
        isLoading={isFetching}
        currency={currency}
      />
      <ProfileOverviewCard currency={currency} />
    </View>
  )
}
