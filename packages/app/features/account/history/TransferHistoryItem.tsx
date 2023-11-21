import { getStatusColor } from 'app/config/status'
import { toThousandSeparator } from 'app/utils'
import { Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import DateTimeCell from './DateTimeCell'
import TransactionHistoryItemBox from './TransactionHistoryItemBox'
import useLocalization from 'app/provider/localization'

const CELL_DATE_WIDTH = 1
const CELL_AMOUNT_WIDTH = 1
const CELL_STATUS_WIDTH = 1

const TransferHistoryItem = ({ item }) => {
  const { t } = useLocalization()
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

        <View style={{ flex: CELL_STATUS_WIDTH }}>
          <Text
            sx={{
              textAlign: 'center',
              color: getStatusColor(item.status, theme),
            }}
          >
            {item.is_positive_amount
              ? t('transfer.receiveFund')
              : t('transfer.transferTitle')}
          </Text>
        </View>

        <View style={{ flex: CELL_STATUS_WIDTH }}>
          <Text
            sx={{
              textAlign: 'center',
              color: getStatusColor(item.status, theme),
            }}
          >
            {item.is_positive_amount ? item.from : item.to}
          </Text>
        </View>

        <View style={{ flex: CELL_AMOUNT_WIDTH }}>
          {/* <Text sx={{ textAlign: 'right' }}>
            {toThousandSeparator(item.amount)}
          </Text> */}

          <Text
            sx={{
              textAlign: 'right',
              color: item.is_positive_amount ? '#00FF19' : '#BE0A16',
            }}
          >
            {item.is_positive_amount
              ? `+${toThousandSeparator(item.amount)}`
              : `-${toThousandSeparator(item.amount)}`}
          </Text>
        </View>
      </View>
    </TransactionHistoryItemBox>
  )
}

export default TransferHistoryItem
