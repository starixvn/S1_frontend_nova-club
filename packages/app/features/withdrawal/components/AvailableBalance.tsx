import Input from 'app/components/form/Input'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import isDesktop from 'app/utils/isDesktop'
import { Text, View } from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'

const AvailableBalance = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()

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

  return desktop ? (
    <DesktopBalance
      label={t('withdrawal.eligibleAmount')}
      totalBalance={totalBalance}
      currency={currency}
    />
  ) : (
    <MobileBalance
      label={t('withdrawal.eligibleAmount')}
      totalBalance={totalBalance}
      currency={currency}
    />
  )
}

const MobileBalance = ({ label, totalBalance, currency }) => (
  <View
    sx={{
      pb: '$4',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    <Text>{label}</Text>
    <Text>
      {toCurrency(totalBalance, currency, {
        symbol: false,
        hideTruncatedThousand: false,
      })}
    </Text>
  </View>
)

const DesktopBalance = ({ label, totalBalance, currency }) => (
  <Input
    label={label}
    value={toCurrency(totalBalance, currency, {
      symbol: false,
      hideTruncatedThousand: false,
    })}
    editable={false}
  />
)

export default AvailableBalance
