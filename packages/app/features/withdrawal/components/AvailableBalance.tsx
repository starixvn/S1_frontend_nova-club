import Input from 'app/components/form/Input'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import isDesktop from 'app/utils/isDesktop'
import { Text, View } from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'
import { useGetAvailableWithdrawalAmountQuery } from 'services/withdrawal'

type AvailableBalanceProps = {
  label?: string
  isTransfer?: boolean
}

const AvailableBalance = ({
  label = 'withdrawal.eligibleAmount',
  isTransfer = false,
}: AvailableBalanceProps) => {
  const { t } = useLocalization()
  const desktop = isDesktop()

  const { currency } = usePlayerProfileQuery()
  const { data } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const { data: availableBalance } = useGetAvailableWithdrawalAmountQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const balance = isTransfer ? data?.totalBalance : availableBalance?.balance

  return desktop ? (
    <DesktopBalance
      label={t(label)}
      totalBalance={balance}
      currency={currency}
    />
  ) : (
    <MobileBalance
      label={t(label)}
      totalBalance={balance}
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
    <Text>{`${label} :`}</Text>
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
