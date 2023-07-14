import IconBorder from 'app/components/IconBorder'
import IconButton from 'app/components/IconButton'
import PaymentMethod, {
  DepositPaymentMethodCategoryId,
  PaymentMethodProps,
} from 'app/config/deposit'
import { getStatusColor } from 'app/config/status'
import useLocalization from 'app/provider/localization'
import { copyToClipboard, toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { Pressable, Text, View, useDripsyTheme } from 'dripsy'
import { useModal } from 'react-native-modalfy'
import { ReportResult } from 'services/playerApi.type'

type TransactionRowListProps = {
  item
}
const TransactionRowList = ({ item }: TransactionRowListProps) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const date = dayjsTz(item.date).format('YYYY/MM/DD')
  const time = dayjsTz(item.date).format('hh:mm a')
  const { openModal } = useModal()

  const category = PaymentMethod.find(
    (el) => el.categoryId === item.second_category_flag
  ) as PaymentMethodProps

  const amount = toCurrency(item.amount, Currency.VND, {
    symbol: false,
  })

  function openUploadBankSlipModal() {
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
    <>
      <View
        sx={{ bg: '$primary.500', flexDirection: 'row', py: '$3', px: '$3' }}
      >
        <View sx={{ flex: 0.4, justifyContent: 'center' }}>
          <IconBorder IconSize={22} IconName={category && category.icon} />
        </View>
        <View sx={{ flex: 1, justifyContent: 'center' }}>
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text numberOfLines={1}>{item.secure_id}</Text>
            <IconButton
              name={'copy'}
              color={'white'}
              size={12}
              sx={{ padding: 5 }}
              onPress={() => copyToClipboard(item.secure_id)}
            />
          </View>
          <Text numberOfLines={1} sx={{ fontWeight: 'bold' }}>
            {item.pay_type}
          </Text>
        </View>
        <View sx={{ flex: 0.7, justifyContent: 'center' }}>
          <Text numberOfLines={1}>{date}</Text>
          <Text numberOfLines={1}>{time}</Text>
        </View>
        <View
          sx={{ flex: 0.7, alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <Text>{amount}</Text>
          <Text sx={{ color: getStatusColor(item.status, theme) }}>
            {item.status}
          </Text>
          {!item.bank_slip_attachment &&
            item.second_category_flag ===
              DepositPaymentMethodCategoryId.LOCAL_BANK && (
              <Pressable onPress={openUploadBankSlipModal}>
                <Text
                  numberOfLines={1}
                  sx={{ textDecorationLine: 'underline', color: '$tertiary' }}
                >
                  {t('deposit.bankSlip')}
                </Text>
              </Pressable>
            )}
        </View>
      </View>
    </>
  )
}

export default TransactionRowList
