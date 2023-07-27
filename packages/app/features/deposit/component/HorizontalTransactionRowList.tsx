import IconButton from 'app/components/IconButton'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { getStatusColor } from 'app/config/status'
import useLocalization from 'app/provider/localization'
import { copyToClipboard, toCurrency, toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { Text, View, useDripsyTheme } from 'dripsy'
import { Pressable } from 'react-native'
import { useModal } from 'react-native-modalfy'

const HorizontalTransactionRowList = ({
  item,
  index,
}: {
  item: any
  index?: number
}) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const { openModal } = useModal()
  const date = dayjsTz(item.date).format('YYYY/MM/DD')
  const time = dayjsTz(item.date).format('hh:mm a')

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
    <View sx={{ flex: 1, flexDirection: 'row', mx: 10 }}>
      <View sx={{ flex: 0.3 }}>
        <Text>{index}</Text>
      </View>

      <View sx={{ flex: 0.9 }}>
        <Text>{t('deposit.depositMethod.bankTransfer')}</Text>
      </View>

      <View sx={{ flex: 1, flexDirection: 'row' }}>
        <Text>{item.secure_id}</Text>
        <IconButton
          name={'copy'}
          color={'white'}
          size={12}
          sx={{ padding: 5 }}
          onPress={() => copyToClipboard(item.secure_id)}
        />
      </View>

      <View sx={{ flex: 0.7, flexDirection: 'column' }}>
        <Text>{date}</Text>
        <Text>{time}</Text>
      </View>

      <View sx={{ flex: 0.5 }}>
        <Text sx={{ textAlign: 'center' }}>
          {toThousandSeparator(item.amount)}
        </Text>
      </View>

      <View sx={{ flex: 0.6 }}>
        <Text
          sx={{
            color: getStatusColor(item.status, theme),
            textAlign: 'center',
          }}
        >
          {item.status}
        </Text>
        {!item.bank_slip_attachment &&
          item.second_category_flag ===
            DepositPaymentMethodCategoryId.LOCAL_BANK && (
            <Pressable onPress={openUploadBankSlipModal}>
              <Text
                sx={{
                  textDecorationLine: 'underline',
                  color: '$tertiary',
                  textAlign: 'center',
                }}
              >
                {t('deposit.bankSlip')}
              </Text>
            </Pressable>
          )}
      </View>
    </View>
  )
}

export default HorizontalTransactionRowList
