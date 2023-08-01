import { toThousandSeparator } from 'app/utils'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import DateTimeCell from '../DateTimeCell'
import { CellViewContainer, TAB_NO } from './DesktopDepositHistoryItem'

export const ReferralTableHeader = [
  TAB_NO,
  { label: 'Date', textStyle: { flex: 1, textAlign: 'left' } },
  { label: 'Amount', textStyle: { flex: 1, textAlign: 'center' } },
]

const DesktopReferralHistoryItem = ({ item, index }) => {
  return (
    <CellViewContainer>
      <CellView index={0}>
        <Text sx={{ textAlign: 'center' }}>{index + 1}</Text>
      </CellView>
      <CellView index={1}>
        <DateTimeCell date={item.date} isShowTime={false} />
      </CellView>

      <CellView index={2}>
        <Text sx={{ textAlign: 'right' }}>
          {toThousandSeparator(item.amount)}
        </Text>
      </CellView>
    </CellViewContainer>
  )
}

const CellView = styled(View)(({ index }: { index: number }) => ({
  ...ReferralTableHeader[index]?.textStyle,
}))

export default DesktopReferralHistoryItem
