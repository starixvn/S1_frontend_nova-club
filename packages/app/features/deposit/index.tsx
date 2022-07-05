import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { Text, View, ActivityIndicator, FlatList, styled } from 'dripsy'
import { useDummyRtk } from 'utils/rtk'
import RecentTransactions from './RecentTransactions'
import DepositMethodCard from './DepositMethodCard'
import { useRouter } from 'solito/router'
import useContextualRouting from 'app/hooks/useContextualRouting'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BankActions } from 'app/store/bankReducer'
import { useDepositPaymentListQuery } from 'services/deposit'
import {
  DepositPaymentMethodCategoryId,
  DepositPaymentMethodCategoryType,
} from 'app/utils/constant'
import DepositConfirmationModal from 'app/components/modal/DepositConfirmationModal'

export enum DepositMethodId {
  LOCAL_BANK = 1,
  ONLINE_BANK = 2,
  MOMO = 3,
  QR_CODE = 4,
  TOP_UP = 5,
  CRYPTO = 6,
}

const sampleData = [
  {
    id: DepositMethodId.LOCAL_BANK,
    type: DepositPaymentMethodCategoryType.LOCAL_BANK,
    categoryId: DepositPaymentMethodCategoryId.LOCAL_BANK,
    name: 'deposit.depositMethod.bankTransfer',
    icon: 'sl',
    color: '#ac0102',
  },
  {
    id: DepositMethodId.ONLINE_BANK,
    type: DepositPaymentMethodCategoryType.ONLINE_BANK,
    categoryId: DepositPaymentMethodCategoryId.ONLINE_BANK,
    name: 'deposit.depositMethod.onlineBanking',
    icon: 'sl',
    color: '#f56e04',
  },
  {
    id: DepositMethodId.MOMO,
    type: DepositPaymentMethodCategoryType.MOMO,
    categoryId: DepositPaymentMethodCategoryId.MOMO,
    name: 'deposit.depositMethod.momo',
    icon: 'sl',
    color: '#AC016C',
  },
  {
    id: DepositMethodId.QR_CODE,
    type: DepositPaymentMethodCategoryType.QR_CODE,
    categoryId: DepositPaymentMethodCategoryId.QR_CODE,
    name: 'deposit.depositMethod.qrCode',
    icon: 'sl',
    color: '#44BAF9',
  },
  {
    id: DepositMethodId.TOP_UP,
    type: DepositPaymentMethodCategoryType.TOP_UP,
    categoryId: DepositPaymentMethodCategoryId.TOP_UP,
    name: 'deposit.depositMethod.topUp',
    icon: 'sl',
    color: '#95AC00',
  },
  {
    id: DepositMethodId.CRYPTO,
    type: DepositPaymentMethodCategoryType.CRYPTO,
    categoryId: DepositPaymentMethodCategoryId.CRYPTO,
    name: 'deposit.depositMethod.crypto',
    icon: 'sl',
    color: '#36A07B',
  },
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
        console.log('🚀 ~ file: index.tsx ~ line 103 ~ convertData ~ res', res)

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

  function fetchDepositPaymentCategories() {
    const formData = new FormData()
    formData.append('is_mobile', '0')
    formData.append('api_key', '42f77fd0409566c6123d58551e85ee87')
    formData.append('token', '26174d76e0f2622d52af21a3757308d2')
    formData.append('username', 'gateway001')

    axios({
      method: 'post',
      url: 'https://player.xoon88.com/api/player_center/depositPaymentCategories',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        //handle success
        const convertData = sampleData.map((item, index) => {
          const res = response.data.result.payment_cats[item.type].find(
            (el) => el.category_id === item.categoryId.toString()
          )

          return {
            ...item,
            categoryText: res.category_text,
            list: res.list,
          }
        })

        setPaymentMethodList(convertData)

        dispatch(BankActions.setDepositPayment(convertData))
      })
      .catch(function (response) {
        //handle error
        console.log(response)
      })
  }

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
        <ActivityIndicator />
      ) : (
        <View sx={{ position: 'relative', mx: '$4' }}>
          {paymentMethodList && (
            <FlatList
              scrollEnabled={false}
              data={paymentMethodList}
              numColumns={2}
              keyExtractor={(item) => item.name}
              renderItem={({ item, index }) => {
                return (
                  <DepositMethodCard
                    item={item}
                    sx={{
                      mr: index % 2 === 0 ? '$8' : 0,
                      mb: paymentMethodList.length - index <= 2 ? 0 : '$4',
                    }}
                    onPress={() => handlePress(item.id)}
                  />
                )
              }}
            />
          )}
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
  alignSelf: 'center',
})

export default withContextualNav(DepositPage, ContextualModuleKey.Deposit)
