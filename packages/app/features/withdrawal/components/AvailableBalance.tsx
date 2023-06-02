import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Text, View } from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'

const AvailableBalance = () => {
  const { t } = useLocalization()
  const { totalBalance } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: (s) => {
      return {
        ...s,
        totalBalance: s.data?.data
          ? Object.values(s.data?.data).reduce(
              (total, w) =>
                total + (Number(w.balance) ?? 0) + (Number(w.reward) ?? 0),
              0
            )
          : 0,
      }
    },
  })

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

  return (
    <View
      sx={{
        pb: '$4',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text>{t('withdrawal.eligibleAmount')}</Text>
      <Text>
        {toCurrency(totalBalance, currency, {
          symbol: false,
          hideTruncatedThousand: false,
        })}
      </Text>
    </View>
  )
}

export default AvailableBalance
