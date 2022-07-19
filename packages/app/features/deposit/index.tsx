import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { Text, View, ActivityIndicator, styled } from 'dripsy'
import RecentTransactions from './RecentTransactions'
import DepositMethodCard from './DepositMethodCard'
import { useRouter } from 'solito/router'
import useContextualRouting from 'app/hooks/useContextualRouting'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BankActions } from 'app/store/bankReducer'
import { useDepositPaymentListQuery } from 'services/deposit'
import {
  DepositPaymentMethodCategoryId,
  DepositPaymentMethodCategoryType,
} from 'app/utils/constant'

export enum DepositMethodId {
  LOCAL_BANK = 1,
  ONLINE_BANK = 2,
  MOMO = 3,
  QR_CODE = 4,
  TOP_UP = 5,
  CRYPTO = 6,
}

const sampleData = [
  // {
  //   id: DepositMethodId.LOCAL_BANK,
  //   type: DepositPaymentMethodCategoryType.LOCAL_BANK,
  //   categoryId: DepositPaymentMethodCategoryId.LOCAL_BANK,
  //   name: 'deposit.depositMethod.bankTransfer',
  //   icon: 'sl',
  //   color: '#ac0102',
  // },
  {
    id: DepositMethodId.ONLINE_BANK,
    type: DepositPaymentMethodCategoryType.ONLINE_BANK,
    categoryId: DepositPaymentMethodCategoryId.ONLINE_BANK,
    name: 'deposit.depositMethod.onlineBanking',
    icon: 'mac',
    color: '#f56e04',
  },
  {
    id: DepositMethodId.MOMO,
    type: DepositPaymentMethodCategoryType.MOMO,
    categoryId: DepositPaymentMethodCategoryId.MOMO,
    name: 'deposit.depositMethod.momo',
    icon: 'momo',
    color: '#AC016C',
  },
  {
    id: DepositMethodId.QR_CODE,
    type: DepositPaymentMethodCategoryType.QR_CODE,
    categoryId: DepositPaymentMethodCategoryId.QR_CODE,
    name: 'deposit.depositMethod.qrCode',
    icon: 'qr',
    color: '#44BAF9',
  },
  {
    id: DepositMethodId.TOP_UP,
    type: DepositPaymentMethodCategoryType.TOP_UP,
    categoryId: DepositPaymentMethodCategoryId.TOP_UP,
    name: 'deposit.depositMethod.topUp',
    icon: 'card',
    color: '#95AC00',
  },
  // {
  //   id: DepositMethodId.CRYPTO,
  //   type: DepositPaymentMethodCategoryType.CRYPTO,
  //   categoryId: DepositPaymentMethodCategoryId.CRYPTO,
  //   name: 'deposit.depositMethod.crypto',
  //   icon: 'sl',
  //   color: '#36A07B',
  // },
]

const DepositPage = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const [paymentMethodList, setPaymentMethodList] = useState(sampleData)
  const { data, isLoading } = useDepositPaymentListQuery()

  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.Deposit
  )
  const toLocalBank = makeContextualHref('local-bank')
  const toOnlineBank = makeContextualHref('online-bank')
  const toMomo = makeContextualHref('momo')
  const toQR = makeContextualHref('qr-transfer')
  const to = makeContextualHref('topup-card')
  const toCrypto = makeContextualHref('crypto')

  useEffect(() => {
    if (data?.success) {
      const convertData = sampleData.map((item, index) => {
        const res = data.data.result[item.type].find(
          (el) => el.category_id === item.categoryId
        )

        if (!res) return item
        return {
          ...item,
          categoryText: res.category_text,
          list: res.list,
        }
      })

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
      <Text sx={{ my: '$6', mx: '$4' }}>{t('deposit.choose')}</Text>
      {isLoading ? (
        <ActivityIndicator color={'$lightCyan'} />
      ) : (
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
                  mb: paymentMethodList.length - index <= 2 ? 0 : '$4',
                }}
                onPress={() => handlePress(item.id)}
              />
            ))}
          <Seperator />
        </View>
      )}
      <RecentTransactions />
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

export default withContextualNav(DepositPage, ContextualModuleKey.Deposit)
