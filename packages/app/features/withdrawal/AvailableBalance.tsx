import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Text, View } from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'

const AvailableBalance = () => {
  const { t } = useLocalization()
  const { data: balanceData } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const playerBalance = balanceData?.data?.main.balance

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

  return (
    <View
      sx={{
        p: '$4',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text>{t('transfer.avaiableAmount')}:</Text>
      <Text>
        {toCurrency(Number(playerBalance), currency, {
          symbol: false,
          hideTruncatedThousand: false,
        })}
      </Text>
    </View>
  )
}

export default AvailableBalance
