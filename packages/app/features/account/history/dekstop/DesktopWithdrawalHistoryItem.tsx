import { getStatusColor } from 'app/config/status'
import { toThousandSeparator } from 'app/utils'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import DateTimeCell from '../DateTimeCell'
import { CellViewContainer } from './DesktopDepositHistoryItem'

export const WithdrawalTableHeader = [
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
  { label: 'Amount', textStyle: { flex: 1, textAlign: 'center' } },
  { label: 'Status', textStyle: { flex: 1, textAlign: 'center' } },
]

const DesktopWithdrawalHistoryItem = ({ item, index }) => {
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
        <Text>{toThousandSeparator(item.amount)}</Text>
      </CellView>

      <CellView index={3}>
        <Text
          sx={{
            color: getStatusColor(item.status, theme),
          }}
        >
          {item.status}
        </Text>
      </CellView>
    </CellViewContainer>
  )
}

const CellView = styled(View)(({ index }: { index: number }) => ({
  ...WithdrawalTableHeader[index]?.textStyle,
}))

export default DesktopWithdrawalHistoryItem
