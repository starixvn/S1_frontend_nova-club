import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, Text, View } from 'dripsy'
import DepositCard from './component/DepositCard'
import useCheckMobile from 'app/hooks/useCheckMobile'
import { useDepositPaymentListQuery } from 'services/deposit'
import { DepositMethodId, PaymentMethod } from 'app/constants/deposit'
import { useState } from 'react'
import { useRouter } from 'solito/router'

const Deposit = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const [paymentMethodList, setPaymentMethodList] = useState(PaymentMethod)

  const { isMobile } = useCheckMobile()
  const { data, isLoading } = useDepositPaymentListQuery({
    is_mobile: isMobile ? 0 : 1,
  })

  const handlePress = (id) => {
    switch (id) {
      case DepositMethodId.LOCAL_BANK:
        push(`/deposit/local-bank`)
        break
      case DepositMethodId.ONLINE_BANK:
        push(`/deposit/online-bank`)
        break
      case DepositMethodId.MOMO:
        push(`/deposit/momo`)
        break
      case DepositMethodId.QR_CODE:
        push(`/deposit/qr-transfer`)
        break
      case DepositMethodId.TOP_UP:
        push(`/deposit/topup-card`)
        break
      case DepositMethodId.CRYPTO:
        push(`/deposit/crypto`)
        break
      default:
        break
    }
  }

  return (
    <PageWithBackHeader header={{ title: t('menu.deposit') }} disableScrollView>
      {isLoading ? (
        <ActivityIndicator sx={{ my: '$6' }} />
      ) : paymentMethodList.length > 0 ? (
        <>
          <Text sx={{ my: '$3', mx: '$4' }}>{t('deposit.choose')}</Text>
          <View
            sx={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {paymentMethodList &&
              paymentMethodList.map((item, index) => (
                <DepositCard
                  key={item.id}
                  item={item}
                  sx={{
                    mb:
                      paymentMethodList.length - index <= 1 &&
                      (index + 1) % 2 === 1
                        ? 0
                        : '$1',
                  }}
                  onPress={() => handlePress(item.id)}
                />
              ))}
            {/* <Seperator /> */}
          </View>
        </>
      ) : null}
      <View>
        <Text>Recent Transction</Text>
      </View>
    </PageWithBackHeader>
  )
}

export default Deposit
