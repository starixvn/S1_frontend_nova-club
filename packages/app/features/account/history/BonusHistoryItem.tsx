import { getStatusColor } from 'app/config/status'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import DateTimeCell from './DateTimeCell'
import TransactionHistoryItemBox from './TransactionHistoryItemBox'

const CELL_DATE_WIDTH = 1
const CELL_TYPE_WIDTH = 1
const CELL_AMOUNT_WIDTH = 1

const BonusHistoryItem = ({ item }) => {
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()

  const isPositive = item.amount > 0
  const displayAmount = toThousandSeparator(item.amount)
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

        <View style={{ flex: CELL_TYPE_WIDTH }}>
          <Text
            sx={{
              textAlign: 'center',
              color: getStatusColor(item.status, theme),
            }}
          >
            {t('filter.transactionType.bonus')}
          </Text>
        </View>

        <View style={{ flex: CELL_AMOUNT_WIDTH }}>
          {/* <Text sx={{ textAlign: 'right' }}>
            {toThousandSeparator(item.amount)}
          </Text> */}

          <Text
            sx={{
              textAlign: 'right',
              color:
                item.amount === 0
                  ? 'white'
                  : isPositive
                  ? '#00FF19'
                  : '#BE0A16',
            }}
          >
            {item.amount === 0
              ? displayAmount
              : isPositive
              ? `+${toThousandSeparator(item.amount)}`
              : `-${toThousandSeparator(item.amount)}`}
          </Text>
        </View>
      </View>
    </TransactionHistoryItemBox>
  )
}

export default BonusHistoryItem
