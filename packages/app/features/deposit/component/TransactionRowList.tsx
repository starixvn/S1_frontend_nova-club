import IconBorder from 'app/components/IconBorder'
import IconButton from 'app/components/IconButton'
import PaymentMethod, {
  DepositPaymentMethodCategoryId,
  PaymentMethodProps,
} from 'app/config/deposit'
import { getStatusColor } from 'app/config/status'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { copyToClipboard, toCurrency } from 'app/utils'
import dayjsTz from 'app/utils/dayjs'
import { Pressable, Text, View, useDripsyTheme } from 'dripsy'
import { useModal } from 'react-native-modalfy'

type TransactionRowListProps = {
  item
}

const TransactionRowList = ({ item }: TransactionRowListProps) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const date = dayjsTz(item.date).format('YYYY/MM/DD')
  const time = dayjsTz(item.date).format('hh:mm a')
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

  const firstCell = { flexBasis: 56 }
  const secondCell = { flex: 0.5 }
  const thirdCell = { flex: 0.3 }
  const fourthCell = {
    flex: 0.2,
    alignItems: 'flex-end',
  }

  return (
    <>
      <View
        sx={{
          bg: '$primary.500',
          flexDirection: 'row',
          py: '$3',
          px: ['$2', '$3'],
          alignItems: 'center',
        }}
      >
        <View sx={firstCell}>
          <IconBorder IconSize={22} IconName={category && category.icon} />
        </View>

        <View sx={secondCell}>
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
            {t(category.name)}
          </Text>
        </View>

        <View sx={thirdCell}>
          <Text numberOfLines={1}>{date}</Text>
          <Text numberOfLines={1}>{time}</Text>
        </View>

        <View sx={fourthCell}>
          <Text>{amount}</Text>
          <Text
            numberOfLines={2}
            sx={{
              color: getStatusColor(item.status, theme),
              textAlign: 'right',
            }}
          >
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
