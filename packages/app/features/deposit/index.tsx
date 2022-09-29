import { PageWithBackHeader } from 'app/components/layout/Page'
import PaymentMethod, { DepositMethodId } from 'app/config/deposit'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import { BankActions } from 'app/store/bankReducer'
import { ActivityIndicator, styled, Text, View } from 'dripsy'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDepositPaymentListQuery } from 'services/deposit'
import { useRouter } from 'solito/router'
import DepositMethodCard from './DepositMethodCard'
import DepositTransactions from './local-bank/DepositTransactions'

const DepositPage = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const [paymentMethodList, setPaymentMethodList] = useState(PaymentMethod)
  const { data, isLoading } = useDepositPaymentListQuery()

  const { makeContextualHref } = useContextualRouting()
  const toLocalBank = makeContextualHref('local-bank')
  const toOnlineBank = makeContextualHref('online-bank')
  const toMomo = makeContextualHref('momo')
  const toQR = makeContextualHref('qr-transfer')
  const to = makeContextualHref('topup-card')
  const toCrypto = makeContextualHref('crypto')

  useEffect(() => {
    if (data?.success) {
      const activeMethod = paymentMethodList.filter(
        (item) => item.active === true
      )
      const convertData = activeMethod
        .map((item) => {
          const method = data?.data?.result[item.type]
          if (method) {
            const res = method.find((el) => el.category_id === item.categoryId)

            if (res)
              return {
                ...item,
                categoryText: res.category_text,
                list: res.list,
              }
          }
        })
        .filter((x) => x != null)

      setPaymentMethodList(convertData)

      dispatch(BankActions.setDepositPayment(convertData))
    }
  }, [data])

  const handlePress = (id) => {
    switch (id) {
      case DepositMethodId.LOCAL_BANK:
        push(toLocalBank, `/deposit/local-bank`)
        break
      case DepositMethodId.ONLINE_BANK:
        push(toOnlineBank, `/deposit/online-bank`)
        break
      case DepositMethodId.MOMO:
        push(toMomo, `/deposit/momo`)
        break
      case DepositMethodId.QR_CODE:
        push(toQR, `/deposit/qr-transfer`)
        break
      case DepositMethodId.TOP_UP:
        push(to, `/deposit/topup-card`)
        break
      case DepositMethodId.CRYPTO:
        push(toCrypto, `/deposit/crypto`)
        break
      default:
        break
    }
  }

  return (
    <PageWithBackHeader header={{ title: t('menu.deposit') }}>
      {isLoading ? (
        <ActivityIndicator sx={{ my: '$6' }} />
      ) : paymentMethodList.length > 0 ? (
        <>
          <Text sx={{ my: '$6', mx: '$4' }}>{t('deposit.choose')}</Text>
          <View
            sx={{
              position: 'relative',
              mx: '$4',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {paymentMethodList &&
              paymentMethodList.map((item, index) => (
                <DepositMethodCard
                  key={item.id}
                  item={item}
                  sx={{
                    mb:
                      paymentMethodList.length - index <= 1 &&
                      (index + 1) % 2 === 1
                        ? 0
                        : '$4',
                  }}
                  onPress={() => handlePress(item.id)}
                />
              ))}
            <Seperator />
          </View>
        </>
      ) : null}
      <DepositTransactions />
    </PageWithBackHeader>
  )
}

const Seperator = styled(View)({
  width: 1,
  bg: '#33A0D0',
  height: '100%',
  position: 'absolute',
  left: '50%',
})

export default DepositPage
