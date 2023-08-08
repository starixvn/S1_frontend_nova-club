import IconButton from 'app/components/IconButton'
import PaymentMethod, {
  DepositPaymentMethodCategoryId,
  PaymentMethodProps,
} from 'app/config/deposit'
import { getStatusColor } from 'app/config/status'

import useLocalization from 'app/provider/localization'
import { copyToClipboard, toCurrency, toThousandSeparator } from 'app/utils'
import dayjsTz from 'app/utils/dayjs'
import { Row, Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { ReportDepositItem } from 'services/playerApi.type'
import DateTimeCell from '../DateTimeCell'
import { Currency } from 'app/utils/constant'

const FONT_SIZE = 16
const ICON_SIZE = 34

type TransactionHistoryItemProps = {
  item: ReportDepositItem
  index: number
}

export const TAB_NO = {
  label: 'No',
  textStyle: {
    flex: 1,
    flexBasis: 60,
    flexGrow: 0,
    textAlign: 'center',
  },
}

export const DepositTableHeader = [
  TAB_NO,
  { label: 'deposit.type', textStyle: { flex: 1.5, textAlign: 'left' } },
  { label: 'deposit.id', textStyle: { flex: 2, textAlign: 'left' } },
  {
    label: 'common.date',
    textStyle: { flex: 1.5, textAlign: 'left' },
  },
  { label: 'common.amount', textStyle: { flex: 1 } },
  { label: 'deposit.status', textStyle: { flex: 2 } },
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

  const amount = toCurrency(item.amount, Currency.VND, {
    symbol: false,
  })

  const handleUploadReceipt = () => {
    openModal('UploadBankSlipModal', {
      depositInfo: {
        depositId: item.secure_id,
        paymentMode: item.pay_type,
        date: dayjsTz(item.date).format('YYYY/MM/DD hh:mm a'),
        status: item.status,
        amount: amount,
      },
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
