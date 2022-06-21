import Page, {
  PageSafeArea,
  PageWithBackHeader,
} from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { Text, View, ActivityIndicator, FlatList, styled } from 'dripsy'
import { useDummyRtk } from 'utils/rtk'
import RecentTransactions from './RecentTransactions'
import DepositMethodCard from './DepositMethodCard'
import { Button } from 'app/components/form/Button'
import { useRouter } from 'solito/router'
import useContextualRouting from 'app/hooks/useContextualRouting'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import ValueCard from './ValueCard'
import { useDepositPaymentCategoriesQuery } from 'app/services/dummyDeposit'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BankActions } from 'app/store/bankReducer'

const mapTypeToIcon = {}

const sampleData = [
  {
    type: 1,
    name: 'deposit.depositMethod.bankTransfer',
    icon: 'sl',
    color: '#ac0102',
  },
  {
    type: 2,
    name: 'deposit.depositMethod.onlineBanking',
    icon: 'sl',
    color: '#f56e04',
  },
  // {
  //   type: 3,
  //   name: 'deposit.depositMethod.momo',
  //   icon: 'sl',
  //   color: '#AC016C',
  // },
  // {
  //   type: 4,
  //   name: 'deposit.depositMethod.qrCode',
  //   icon: 'sl',
  //   color: '#44BAF9',
  // },
  {
    type: 5,
    name: 'deposit.depositMethod.topUp',
    icon: 'sl',
    color: '#95AC00',
  },
  {
    type: 6,
    name: 'deposit.depositMethod.crypto',
    icon: 'sl',
    color: '#36A07B',
  },
]

const DepositPage = () => {
  const { data, isLoading, isFetching } = useDummyRtk(sampleData)
  const { push } = useRouter()
  const { t } = useLocalization()
  const dispatch = useDispatch()

  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.Deposit
  )
  const toLocalBank = makeContextualHref('local-bank')
  const toOnlineBank = makeContextualHref('online-bank')
  const to = makeContextualHref('topup-card')
  const toCrypto = makeContextualHref('crypto')

  useEffect(() => {
    fetchDepositPaymentCategories()
  }, [])

  function fetchDepositPaymentCategories() {
    const formData = new FormData()
    formData.append('is_mobile', '0')
    formData.append('api_key', '42f77fd0409566c6123d58551e85ee87')
    formData.append('token', 'f9ef9de5e3fafecb2513ca524dba2266')
    formData.append('username', 'gateway001')

    axios({
      method: 'post',
      url: 'https://player.xoon88.com/api/player_center/depositPaymentCategories',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        //handle success
        console.log(response)
        dispatch(
          BankActions.setDepositPayment(response.data.result.payment_cats)
        )
      })
      .catch(function (response) {
        //handle error
        console.log(response)
      })
  }

  const handlePress = (type) => {
    switch (type) {
      case 1:
        push(toLocalBank, `/deposit/local-bank`)
        break
      case 2:
        push(toOnlineBank, `/deposit/online-bank`)
        break
      case 5:
        push(to, `/deposit/topup-card`)
        break
      case 6:
        push(toCrypto, `/deposit/crypto`)
        break
      default:
        break
    }
  }

  return (
    <PageWithBackHeader header={{ title: t('menu.deposit') }}>
      <Text sx={{ my: '$6', mx: '$4' }}>{t('deposit.choose')}</Text>
      {isLoading && <ActivityIndicator />}
      <View sx={{ position: 'relative', mx: '$4' }}>
        {data && (
          <FlatList
            scrollEnabled={false}
            data={data}
            numColumns={2}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index }) => {
              return (
                <DepositMethodCard
                  item={item}
                  sx={{
                    mr: index % 2 === 0 ? '$8' : 0,
                    mb: data.length - index <= 2 ? 0 : '$4',
                  }}
                  onPress={() => handlePress(item.type)}
                />
              )
            }}
          />
        )}
        <Seperator />
      </View>
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
