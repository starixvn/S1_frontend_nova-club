import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import { Row, StyledProps, Text } from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'

enum DAILY {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

type DailyMaxProps = {
  type: 'deposit' | 'withdrawal'
  amount: string | undefined
  dailyMax: string | undefined
} & StyledProps

const DailyMax = ({
  type,
  amount = '0',
  dailyMax = '0',
  ...rest
}: DailyMaxProps) => {
  const { t } = useLocalization()
  const { currency } = usePlayerProfileQuery()
  const label =
    type === DAILY.DEPOSIT ? t('deposit.dailyMax') : t('withdrawal.dailyMax')

  return (
    <Row sx={{ px: '$0', py: '$3' }} {...rest}>
      <Text sx={{ flex: 1 }}>{label}</Text>
      <Text>{`${toCurrency(amount ?? 0, currency, {
        symbol: false,
        forceDecimal: false,
      })}/${toCurrency(dailyMax ?? 0, currency, {
        symbol: false,
        forceDecimal: false,
      })}`}</Text>
    </Row>
  )
}

export default DailyMax
