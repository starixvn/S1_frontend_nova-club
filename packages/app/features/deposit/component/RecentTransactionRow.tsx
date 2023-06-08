import IconBorder from 'app/components/IconBorder'
import IconButton from 'app/components/IconButton'
import PaymentMethod from 'app/config/deposit'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { PaymentMethodProps } from 'app/config/deposit'
import { getStatusColor } from 'app/config/status'
import { copyToClipboard, toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { Text, View, useDripsyTheme } from 'dripsy'
import { ReportResult } from 'services/playerApi.type'

type RecentTransactionRowProps = {
  item: ReportResult
}

const RecentTransactionRow = ({ item }) => {
  const { theme } = useDripsyTheme()
  const date = dayjsTz(item.date).format('YYYY/MM/DD')
  const time = dayjsTz(item.date).format('hh:mm a')

  const category = PaymentMethod.find(
    (el) => el.categoryId === item.second_category_flag
  ) as PaymentMethodProps

  const amount = toCurrency(item.amount, Currency.VND, {
    symbol: false,
  })

  return (
    <View sx={{ bg: '$primary.200', py: 2, mb: 10 }}>
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
            <Text>{item.secure_id}</Text>
            <IconButton
              name={'copy'}
              color={'white'}
              size={12}
              sx={{ padding: 5 }}
              onPress={() => copyToClipboard(item.secure_id)}
            />
          </View>
          <Text sx={{ fontWeight: 'bold' }}>{item.pay_type}</Text>
        </View>
        <View sx={{ flex: 0.7, justifyContent: 'center' }}>
          <Text>{date}</Text>
          <Text>{time}</Text>
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
              <Text
                sx={{ textDecorationLine: 'underline', color: '$tertiary' }}
              >
                Bank Slip
              </Text>
            )}
        </View>
      </View>
    </View>
  )
}

export default RecentTransactionRow
