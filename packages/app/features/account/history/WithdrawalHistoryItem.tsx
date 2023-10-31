import { getStatusColor } from 'app/config/status'
import { copyToClipboard, toThousandSeparator } from 'app/utils'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import TransactionHistoryItemBox from './TransactionHistoryItemBox'
import DateTimeCell from './DateTimeCell'
import IconButton from 'app/components/IconButton'
import { ReportWithdrawalItem } from 'services/playerApi.type'
import { useModal } from 'react-native-modalfy'

export const WithdrawalTableHeader = [
  { label: 'deposit.id', textStyle: { flex: 1.5, textAlign: 'left' } },
  { label: 'common.date', textStyle: { flex: 1, textAlign: 'left' } },
  { label: 'common.amount', textStyle: { flex: 1, textAlign: 'center' } },
  { label: 'deposit.status', textStyle: { flex: 1, textAlign: 'center' } },
]

const WithdrawalHistoryItem = ({ item }: { item: ReportWithdrawalItem }) => {
  return (
    <TransactionHistoryItemBox>
      <WithdrawalHistoryItemContent item={item} />
    </TransactionHistoryItemBox>
  )
}

export const WithdrawalHistoryItemContent = ({ item }) => {
  const { theme } = useDripsyTheme()
  const { openModal } = useModal()

  return (
    <View
      sx={{
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        p: '$3',
        pr: '$1',
        alignItems: 'center',
      }}
    >
      <CellView
        index={0}
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: '$2',
        }}
      >
        <Text sx={{ minWidth: 125 }}>{item.tx_code}</Text>
        <IconButton
          name="copy"
          color={'white'}
          size={14}
          sx={{ pl: 0 }}
          onPress={() => copyToClipboard(item.tx_code)}
        />
      </CellView>

      <CellView index={1}>
        <DateTimeCell date={item.date} />
      </CellView>

      <View>
        <CellView index={2}>
          <Text sx={{ textAlign: 'center' }}>
            {toThousandSeparator(item.amount)}
          </Text>
        </CellView>

        <CellView index={3}>
          <Text
            sx={{
              textAlign: 'center',
              color: getStatusColor(item.status, theme),
            }}
          >
            {item.status}
          </Text>
        </CellView>
      </View>

      <View sx={{ flexBasis: 28, alignItems: 'flex-end' }}>
        {item.notes && (
          <IconButton
            name="notice"
            color={'white'}
            size={14}
            onPress={() =>
              openModal('NotesModal', {
                id: item.tx_code,
                data: item.notes,
              })
            }
          />
        )}
      </View>
    </View>
  )
}

const CellView = styled(View)(({ index }: { index: number }) => ({
  ...WithdrawalTableHeader[index]?.textStyle,
}))

export default WithdrawalHistoryItem
