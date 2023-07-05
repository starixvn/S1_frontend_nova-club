import { getProviderLogo } from 'app/config/games/provider'
import { toThousandSeparator } from 'app/utils'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import DateTimeCell from '../DateTimeCell'
import { CellViewContainer } from './DesktopDepositHistoryItem'
import { SolitoImage } from 'solito/image'

export const RedeemTableHeader = [
  {
    label: 'No',
    textStyle: {
      flex: 1,
      flexBasis: 60,
      flexGrow: 0,
      textAlign: 'center',
    },
  },
  {
    label: 'Date',
    textStyle: { flex: 1, textAlign: 'left', pl: 12 },
  },
  { label: 'Category', textStyle: { flex: 1, textAlign: 'left' } },
  { label: 'Vui Coins', textStyle: { flex: 1, textAlign: 'center' } },
]

const DesktopRedeemHistoryItem = ({ item, index }) => {
  return (
    <CellViewContainer>
      <CellView index={0}>
        <Text sx={{ textAlign: 'center' }}>{index + 1}</Text>
      </CellView>

      <CellView index={1}>
        <DateTimeCell date={item.date} isShowTime={false} />
      </CellView>

      <CellView index={2}>
        <Text>{item.eventName}</Text>
      </CellView>

      <CellView index={3}>
        <Text sx={{ textAlign: 'center' }}>
          {toThousandSeparator(item.bet)}
        </Text>
        <Text
          sx={{
            textAlign: 'center',
            color: item.transactionType.includes('Minus')
              ? '#BE0A16'
              : '#00FF19',
          }}
        >
          {item.transactionType.includes('Minus')
            ? item.amount
            : `+${item.amount}`}
        </Text>
      </CellView>
    </CellViewContainer>
  )
}
const CellView = styled(View)(({ index }: { index: number }) => ({
  ...RedeemTableHeader[index]?.textStyle,
}))

export default DesktopRedeemHistoryItem
