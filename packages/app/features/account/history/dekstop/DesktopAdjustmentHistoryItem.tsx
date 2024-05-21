import {
  getAdjustmentAmountColor,
  getAdjustmentAmountPrefix,
  getStatusColor,
} from 'app/config/status'
import { toThousandSeparator } from 'app/utils'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import DateTimeCell from '../DateTimeCell'
import { CellViewContainer, TAB_NO } from './DesktopDepositHistoryItem'

export const AdjustmentTableHeader = [
  TAB_NO,
  { label: 'common.date', textStyle: { flex: 1, textAlign: 'left' } },
  { label: 'common.amount', textStyle: { flex: 1, textAlign: 'center' } },
]

const DesktopAdjustmentHistoryItem = ({ item, index }) => {
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
            color: getAdjustmentAmountColor(item.transaction_type),
          }}
        >
          {`${getAdjustmentAmountPrefix(
            item.transaction_type
          )} ${toThousandSeparator(item.amount)}`}
        </Text>
      </CellView>
    </CellViewContainer>
  )
}

const CellView = styled(View)(({ index }: { index: number }) => ({
  ...AdjustmentTableHeader[index]?.textStyle,
}))

export default DesktopAdjustmentHistoryItem
