import { getBonusStatusColor, getDepositStatusColor } from 'app/config/status'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import DateTimeCell from '../DateTimeCell'
import { CellViewContainer, TAB_NO } from './DesktopDepositHistoryItem'

export const BonusTableHeader = [
  TAB_NO,
  { label: 'common.date', textStyle: { flex: 1, textAlign: 'left' } },
  { label: 'deposit.type', textStyle: { flex: 1, textAlign: 'center' } },
  { label: 'common.amount', textStyle: { flex: 1, textAlign: 'center' } },
  { label: 'deposit.status', textStyle: { flex: 1, textAlign: 'center' } },
]

const DesktopBonusHistoryItem = ({ item, index }) => {
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()

  const isPositive = item.amount > 0
  const displayAmount = toThousandSeparator(item.amount)
  return (
    <CellViewContainer>
      <CellView index={0}>
        <Text sx={{ textAlign: 'center' }}>{index + 1}</Text>
      </CellView>
      <CellView index={1}>
        <DateTimeCell date={item.date} />
      </CellView>

      <CellView index={2}>
        <Text
          sx={{
            textAlign: 'center',
            color: getDepositStatusColor(item.status),
          }}
        >
          {t('filter.transactionType.bonus')}
        </Text>
      </CellView>

      <CellView index={3}>
        <Text
          sx={{
            color:
              item.amount === 0 ? 'white' : isPositive ? '#00FF19' : '#BE0A16',
          }}
        >
          {item.amount === 0
            ? displayAmount
            : isPositive
            ? `+${toThousandSeparator(item.amount)}`
            : `-${toThousandSeparator(item.amount)}`}
        </Text>
      </CellView>
      <CellView index={4}>
        <Text
          sx={{
            color: getBonusStatusColor(item?.status?.toLowerCase()),
          }}
        >
          {item.status}
        </Text>
      </CellView>
    </CellViewContainer>
  )
}

const CellView = styled(View)(({ index }: { index: number }) => ({
  ...BonusTableHeader[index]?.textStyle,
}))

export default DesktopBonusHistoryItem
