import IconButton from 'app/components/IconButton'
import PaymentMethod, {
  DepositPaymentMethodCategoryId,
  PaymentMethodProps,
} from 'app/config/deposit'
import { getStatusColor } from 'app/config/status'
import DateTimeCell from 'app/features/history/DateTimeCell'
import useLocalization from 'app/provider/localization'
import { copyToClipboard, toThousandSeparator } from 'app/utils'
import dayjsTz from 'app/utils/dayjs'
import { Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { ReportDepositItem } from 'services/playerApi.type'

export const CELL_PAYMENT_WIDTH = 0.5
export const CELL_DATE_WIDTH = 0.2
export const CELL_STATUS_WIDTH = 0.3
const FONT_SIZE = 14
const ICON_SIZE = 34

type TransactionHistoryItemProps = {
  item: ReportDepositItem
  index: number
}

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
    <View
      sx={{
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        p: '$2',
        alignItems: 'center',
      }}
    >
      <View sx={{ flex: CELL_PAYMENT_WIDTH }}>
        <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{index + 1}</Text>

          <Text sx={{ fontSize: FONT_SIZE, fontWeight: 'bold' }}>
            {t(category?.name)}
          </Text>

          <View>
            <View
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text sx={{ fontSize: FONT_SIZE, mr: '$2', minWidth: 105 }}>
                {item.secure_id}
              </Text>
              <IconButton
                name="copy"
                color={'white'}
                size={14}
                onPress={() => copyToClipboard(item.secure_id)}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: CELL_DATE_WIDTH }}>
        <DateTimeCell
          date={item.date}
          sx={{ textAlign: 'left', fontSize: FONT_SIZE, py: 2 }}
        />
      </View>

      <Text sx={{ textAlign: 'center', fontSize: FONT_SIZE }}>
        {toThousandSeparator(item.amount)}
      </Text>

      <View style={{ flex: CELL_STATUS_WIDTH, alignItems: 'flex-end' }}>
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
                fontSize: 12,
                /* widen click bank upload area */
                py: 5,
                pl: 5,
                my: -5,
                /* */
                ml: 4,
                textDecorationLine: 'underline',
                color: '$tertiary',
              }}
              onPress={handleUploadReceipt}
            >
              {t('deposit.bankSlip')}
            </Text>
          )}
      </View>
    </View>
  )
}

const IconWrap = styled(View)({
  height: ICON_SIZE,
  width: ICON_SIZE,
  borderRadius: ICON_SIZE,
  // borderWidth: 2,
  // borderColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
})

export default DesktopDepositHistoryItem
