import IconButton from 'app/components/IconButton'
import { getWithdrawalStatusColor } from 'app/config/status'
import { copyToClipboard, toThousandSeparator } from 'app/utils'
import { Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import DateTimeCell from '../DateTimeCell'
import { CellViewContainer, TAB_NO } from './DesktopDepositHistoryItem'
import useLocalization from 'app/provider/localization'

export const WithdrawalTableHeader = [
  TAB_NO,
  { label: 'deposit.id', textStyle: { flex: 2, textAlign: 'left' } },
  { label: 'common.date', textStyle: { flex: 1, textAlign: 'left' } },
  { label: 'common.amount', textStyle: { flex: 1, textAlign: 'center' } },
  { label: 'deposit.status', textStyle: { flex: 1, textAlign: 'center' } },
  { label: '', textStyle: { flexBasis: 24 } },
]

const DesktopWithdrawalHistoryItem = ({ item, index }) => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  return (
    <CellViewContainer>
      <CellView index={0}>
        <Text sx={{ textAlign: 'center' }}>{index + 1}</Text>
      </CellView>

      <CellView
        index={1}
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: '$2',
        }}
      >
        <Text sx={{ fontSize: 16, minWidth: 125 }}>{item.tx_code}</Text>
        <IconButton
          name="copy"
          color={'white'}
          size={14}
          onPress={() => copyToClipboard(item.tx_code)}
        />
      </CellView>

      <CellView index={2}>
        <DateTimeCell date={item.date} />
      </CellView>

      <CellView index={3}>
        <Text>{toThousandSeparator(item.amount)}</Text>
      </CellView>

      <CellView index={4}>
        <Text
          sx={{
            color: getWithdrawalStatusColor(item.status),
          }}
        >
          {t(`withdrawalStatus.${item.status}`)}
        </Text>
      </CellView>

      <View sx={{ flexBasis: 24, alignItems: 'flex-end' }}>
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
    </CellViewContainer>
  )
}

const CellView = styled(View)(({ index }: { index: number }) => ({
  ...WithdrawalTableHeader[index]?.textStyle,
}))

export default DesktopWithdrawalHistoryItem
