import Input from 'app/components/form/Input'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { toCurrency } from 'app/utils'
import { A, ActivityIndicator, Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useGetAvailableWithdrawalAmountQuery } from 'services/withdrawal'

type AvailableBalanceProps = {
  label?: string
}

const AvailableBalance = ({
  label = 'withdrawal.eligibleAmount',
}: AvailableBalanceProps) => {
  const { t } = useLocalization()
  const desktop = useIsDesktop()
  const currency = useAppSelector((state) => state.setting.currency)
  const [delay, setDelay] = useState(true)

  const {
    data: availableBalance,
    isLoading,
    isUninitialized,
  } = useGetAvailableWithdrawalAmountQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: delay,
  })

  // Delay fetch GetAvailableWithdrawalAmount api, since cannot fetch with playerBalance api at the same time
  useEffect(() => {
    setTimeout(() => {
      setDelay(false)
    }, 500)
  }, [])

  const balance = availableBalance?.balance

  return desktop ? (
    <DesktopBalance
      label={t(label)}
      totalBalance={balance}
      currency={currency}
      isLoading={isLoading || isUninitialized}
    />
  ) : (
    <MobileBalance
      label={t(label)}
      totalBalance={balance}
      currency={currency}
      isLoading={isLoading || isUninitialized}
    />
  )
}

const MobileBalance = ({ label, totalBalance, currency, isLoading }) => (
  <View
    sx={{
      pb: '$4',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Text>{`${label} :`}</Text>
    <View sx={{ minHeight: 30, justifyContent: 'center' }}>
      {isLoading ? (
        <ActivityIndicator color="$primary.100" />
      ) : (
        <Text sx={{ fontWeight: 'bold' }}>
          {toCurrency(totalBalance, currency, {
            symbol: false,
            hideTruncatedThousand: false,
          })}
        </Text>
      )}
    </View>
  </View>
)

const DesktopBalance = ({ label, totalBalance, currency, isLoading }) => (
  <Input
    label={label}
    value={toCurrency(totalBalance, currency, {
      symbol: false,
      hideTruncatedThousand: false,
    })}
    editable={false}
    action={isLoading ? <ActivityIndicator color="$primary.100" /> : null}
  />
)

export default AvailableBalance
