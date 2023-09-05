import ProfileBalanceSummary from 'app/features/account/ProfileBalanceSummary'
import ProfileHeaderCard from 'app/features/account/ProfileHeaderCard'
import ProfileOverviewCard from 'app/features/account/ProfileOverviewCard'
import { useAppSelector } from 'app/provider/redux/store'
import { Currency } from 'utils/constant'
import { View } from 'dripsy'
import React, { useMemo } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'

export const ACCOUNT_MENU_HEIGHT = 160 // can remove this if the component inside can have dynamic height
export default function AccountMenu({}) {
  const isLoggedIn = useAppSelector((state) => !!state.auth.info)

  const { data: playerData } = usePlayerProfileQuery(undefined, {
    skip: !isLoggedIn,
  })

  const currency = playerData?.currency as Currency
  const { isFetching, data } = usePlayerBalanceQuery(undefined, {
    skip: !isLoggedIn,
  })

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
        cash={data?.totalBalance ?? 0}
        reward={data?.totalReward ?? 0}
        isLoading={isFetching}
        currency={currency}
      />
      <ProfileOverviewCard currency={currency} />
    </View>
  )
}
