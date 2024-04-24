import Icon from 'app/components/Icon'
import IconButton from 'app/components/IconButton'
import PaymentMethod, {
  DepositPaymentMethodCategoryId,
  PaymentMethodProps,
} from 'app/config/deposit'
import { getStatusColor } from 'app/config/status'
import TransactionHistoryItemBox from 'app/features/account/history/TransactionHistoryItemBox'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { copyToClipboard, toCurrency, toThousandSeparator } from 'app/utils'
import dayjsTz from 'app/utils/dayjs'
import { Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { Shadow } from 'react-native-shadow-2'
import { ReportDepositItem } from 'services/playerApi.type'
import DateTimeCell from './DateTimeCell'

export const CELL_PAYMENT_WIDTH = 0.5
export const CELL_DATE_WIDTH = 0.2
export const CELL_STATUS_WIDTH = 0.3
const FONT_SIZE = 14
const ICON_SIZE = 34

type TransactionHistoryItemProps = {
  item: ReportDepositItem
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

const DepositHistoryItem = ({ item }: TransactionHistoryItemProps) => {
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()
  const { openModal } = useModal()
  const currency = useAppSelector((state) => state.setting.currency)

  const category = PaymentMethod.find((el) =>
    typeof el.categoryId === 'number'
      ? el.categoryId === item.second_category_flag
      : el.categoryId.includes(item.second_category_flag)
  ) as PaymentMethodProps

  const amount = toCurrency(item.amount, currency, {
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
    <TransactionHistoryItemBox>
      <View
        sx={{
          flex: 1,
          alignSelf: 'stretch',
          flexDirection: 'row',
          p: '$2',
          pb: '$0',
        }}
      >
        <View sx={{ flex: CELL_PAYMENT_WIDTH }}>
          <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <Shadow
              offset={[0, 1]}
              startColor={theme.colors.$primary[100]}
              distance={1}
              style={{
                height: ICON_SIZE,
                width: ICON_SIZE,
                borderRadius: ICON_SIZE,
                marginRight: 10,
              }}
            >
              <IconWrap sx={{ bg: category?.color ?? 'white', mr: '$2' }}>
                <Icon name={category?.icon} size={ICON_SIZE * 0.6} />
              </IconWrap>
            </Shadow>

            <View sx={{ flex: 1 }}>
              <View
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
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
              </View>
              <Text
                sx={{
                  fontSize: FONT_SIZE,
                  fontWeight: 'bold',
                  flexWrap: 'wrap',
                  flex: 1,
                }}
              >
                {t(category?.name)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flex: CELL_DATE_WIDTH }}>
          <DateTimeCell
            date={item.date}
            sx={{ textAlign: 'left', fontSize: FONT_SIZE }}
          />
        </View>

        <View style={{ flex: CELL_STATUS_WIDTH }}>
          <Text sx={{ textAlign: 'right', fontSize: FONT_SIZE }}>
            {toThousandSeparator(item.amount)}
          </Text>
          <Text
            sx={{
              textAlign: 'right',
              color: getStatusColor(item.status, theme),
              fontSize: FONT_SIZE,
            }}
          >
            {item.status}
          </Text>
        </View>

        <View sx={{ flexBasis: 24, alignItems: 'flex-end' }}>
          {item.notes && (
            <IconButton
              name="notice"
              color={'white'}
              size={14}
              onPress={() =>
                openModal('NotesModal', {
                  id: item.secure_id,
                  data: item.notes,
                })
              }
            />
          )}
        </View>
      </View>
      {!item.bank_slip_attachment &&
        item.second_category_flag ===
          DepositPaymentMethodCategoryId.LOCAL_BANK && (
          <Text
            numberOfLines={1}
            sx={{
              fontSize: FONT_SIZE,
              px: '$2',
              pb: '$2',
              mr: 24,
              textDecorationLine: 'underline',
              color: '$tertiary',
              textAlign: 'right',
            }}
            onPress={handleUploadReceipt}
          >
            {t('deposit.bankSlip')}
          </Text>
        )}
    </TransactionHistoryItemBox>
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

export default DepositHistoryItem
