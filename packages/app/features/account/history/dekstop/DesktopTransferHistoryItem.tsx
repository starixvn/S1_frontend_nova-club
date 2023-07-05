import { getStatusColor } from 'app/config/status'
import { toThousandSeparator } from 'app/utils'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import { CellViewContainer } from './DesktopDepositHistoryItem'
import DateTimeCell from '../DateTimeCell'

export const TransferTableHeader = [
  {
    label: 'No',
    textStyle: {
      flex: 1,
      flexBasis: 60,
      flexGrow: 0,
      textAlign: 'center',
    },
  },
  { label: 'Date', textStyle: { flex: 1, textAlign: 'left' } },
  { label: 'Username', textStyle: { flex: 1, textAlign: 'center' } },
  { label: 'Amount', textStyle: { flex: 1, textAlign: 'center' } },
]

const DesktopTransferHistoryItem = ({ item, index }) => {
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
            color: getStatusColor(item.status, theme),
          }}
        >
          {item.is_positive_amount ? item.from : item.to}
        </Text>
      </CellView>

      <CellView index={3}>
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
