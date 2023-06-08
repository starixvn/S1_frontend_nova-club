import { getStatusColor } from 'app/config/status'
import { toThousandSeparator } from 'app/utils'
import { Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import DateTimeCell from './DateTimeCell'
import TransactionHistoryItemBox from './TransactionHistoryItemBox'

const CELL_DATE_WIDTH = 1
const CELL_AMOUNT_WIDTH = 1
const CELL_STATUS_WIDTH = 1

const WithdrawalHistoryItem = ({ item }) => {
  const { theme } = useDripsyTheme()
  return (
    <TransactionHistoryItemBox>
      <View
        sx={{
          flex: 1,
          alignSelf: 'stretch',
          flexDirection: 'row',
          p: '$3',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: CELL_DATE_WIDTH }}>
          <DateTimeCell date={item.date} />
        </View>

        <View style={{ flex: CELL_AMOUNT_WIDTH }}>
          <Text sx={{ textAlign: 'center' }}>
            {toThousandSeparator(item.amount)}
          </Text>
        </View>

        <View style={{ flex: CELL_STATUS_WIDTH }}>
          <Text
            sx={{
              textAlign: 'center',
              color: getStatusColor(item.status, theme),
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </TransactionHistoryItemBox>
  )
}

export default WithdrawalHistoryItem
