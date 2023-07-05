import IconButton from 'app/components/IconButton'
import PaymentMethod, {
  DepositPaymentMethodCategoryId,
  PaymentMethodProps,
} from 'app/config/deposit'
import { getStatusColor } from 'app/config/status'

import useLocalization from 'app/provider/localization'
import { copyToClipboard, toThousandSeparator } from 'app/utils'
import dayjsTz from 'app/utils/dayjs'
import { Row, Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { ReportDepositItem } from 'services/playerApi.type'
import DateTimeCell from '../DateTimeCell'

const FONT_SIZE = 16
const ICON_SIZE = 34

type TransactionHistoryItemProps = {
  item: ReportDepositItem
  index: number
}

export const DepositTableHeader = [
  {
    label: 'No',
    textStyle: {
      flex: 1,
      flexBasis: 60,
      flexGrow: 0,
      textAlign: 'center',
    },
  },
  { label: 'Type', textStyle: { flex: 1.5, textAlign: 'left' } },
  { label: 'ID', textStyle: { flex: 2, textAlign: 'left' } },
  { label: 'Date', textStyle: { flex: 1.5, textAlign: 'left' } },
  { label: 'Amount', textStyle: { flex: 2 } },
  { label: 'Status', textStyle: { flex: 2 } },
]

const CONFIRMATION_FIELDS = [
  {
    label: 'transaction.id',
    value: 'transactionId',
  },
  {
    label: 'deposit.paymentMode',
    value: 'paymentMethod',
  },
  {
    label: 'common.date',
    value: 'date',
  },
  {
    label: 'menu.tab.status',
    value: 'status',
  },
  {
    label: 'common.amount',
    value: 'amount',
  },
]

const DesktopDepositHistoryItem = ({
  item,
  index,
}: TransactionHistoryItemProps) => {
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()
  const { openModal } = useModal()

  const category = PaymentMethod.find(
    (el) => el.categoryId === item.second_category_flag
  ) as PaymentMethodProps

  const handleUploadReceipt = () => {
    openModal('DepositUploadModal', {
      descInfo: {
        transactionId: item.secure_id,
        paymentMethod: t(category.name),
        date: dayjsTz(item.date).format('YYYY-MM-DD hh:mm a'),
        status: item.status,
        amount: item.amount,
      },
      fields: CONFIRMATION_FIELDS,
    })
  }

  return (
    <CellViewContainer>
      <CellView index={0}>
        <Text sx={{ textAlign: 'center' }}>{index + 1}</Text>
      </CellView>

      <CellView index={1}>
        <Text sx={{ fontSize: FONT_SIZE, fontWeight: 'bold' }}>
          {t(category?.name)}
        </Text>
      </CellView>

      <CellView
        index={2}
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: '$2',
        }}
      >
        <Text sx={{ fontSize: FONT_SIZE, minWidth: 105 }}>
          {item.secure_id}
        </Text>
        <IconButton
          name="copy"
          color={'white'}
          size={14}
          onPress={() => copyToClipboard(item.secure_id)}
        />
      </CellView>

      <CellView index={3}>
        <DateTimeCell
          date={item.date}
          sx={{ textAlign: 'left', fontSize: FONT_SIZE, py: 2 }}
        />
      </CellView>

      <CellView index={4}>
        <Text sx={{ textAlign: 'center', fontSize: FONT_SIZE }}>
          {toThousandSeparator(item.amount)}
        </Text>
      </CellView>

      <CellView index={5}>
        <Text
          sx={{
            textAlign: 'center',
            color: getStatusColor(item.status, theme),
            fontSize: FONT_SIZE,
          }}
        >
          {item.status}
        </Text>
        {!item.bank_slip_attachment &&
          item.second_category_flag ===
            DepositPaymentMethodCategoryId.LOCAL_BANK && (
            <Text
              numberOfLines={1}
              sx={{
                fontSize: FONT_SIZE,
                /* widen click bank upload area */
                py: 5,
                px: 5,
                my: -5,
                /* */
                textDecorationLine: 'underline',
                color: '$tertiary',
                textAlign: 'center',
              }}
              onPress={handleUploadReceipt}
            >
              {t('deposit.bankSlip')}
            </Text>
          )}
      </CellView>
    </CellViewContainer>
  )
}

export const CellViewContainer = styled(Row)({
  flex: 1,
  alignSelf: 'stretch',
  py: '$2',
  alignItems: 'center',
})

export const CellView = styled(View)(({ index }: { index: number }) => ({
  ...DepositTableHeader[index]?.textStyle,
}))

export default DesktopDepositHistoryItem
