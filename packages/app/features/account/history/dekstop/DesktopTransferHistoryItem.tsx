import { getStatusColor } from 'app/config/status'
import { toThousandSeparator } from 'app/utils'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import { CellViewContainer, TAB_NO } from './DesktopDepositHistoryItem'
import DateTimeCell from '../DateTimeCell'
import useLocalization from 'app/provider/localization'

export const TransferTableHeader = [
  TAB_NO,
  { label: 'common.date', textStyle: { flex: 1, textAlign: 'left' } },
  { label: 'common.action', textStyle: { flex: 1, textAlign: 'center' } },
  { label: 'common.username', textStyle: { flex: 1, textAlign: 'center' } },
  { label: 'common.amount', textStyle: { flex: 1, textAlign: 'center' } },
]

const DesktopTransferHistoryItem = ({ item, index }) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()

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
          }}
        >
          {item.is_positive_amount
            ? t('transfer.receiveFund')
            : t('transfer.transferTitle')}
        </Text>
      </CellView>

      <CellView index={3}>
        <Text
          sx={{
            textAlign: 'center',
          }}
        >
          {item.is_positive_amount ? item.from : item.to}
        </Text>
      </CellView>

      <CellView index={4}>
        <Text
          sx={{
            color: item.is_positive_amount ? '#00FF19' : '#BE0A16',
          }}
        >
          {item.is_positive_amount
            ? `+${toThousandSeparator(item.amount)}`
            : `-${toThousandSeparator(item.amount)}`}
        </Text>
      </CellView>
    </CellViewContainer>
  )
}

const CellView = styled(View)(({ index }: { index: number }) => ({
  ...TransferTableHeader[index]?.textStyle,
}))
export default DesktopTransferHistoryItem
