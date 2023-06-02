import DepositMethodCard from 'app/components/DepositMethodCard'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import MenuNotice from 'app/components/navigation/MenuNotice'
import { DepositMethodId, PAYMENT_METHOD } from 'app/constants/deposit'
import useLocalization from 'app/provider/localization'
import { WITHDRAWAL_NOTES } from 'app/utils/constant'
import { Text, View, styled } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useCryptoBankQuery } from 'services/bank'
import { useRouter } from 'solito/router'
import AvailableBalance from './components/AvailableBalance'
import WithdrawalTransactions from './components/WithdrawalTransactions'

const WithdrawalScreen = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { openModal } = useModal()
  const [withdrawalOptions, setWithdrawalOptions] = useState([
    PAYMENT_METHOD.LOCAL_BANK,
  ])

  const { cryptoBankList } = useCryptoBankQuery(undefined, {
    selectFromResult: ({ data }) => ({
      cryptoBankList: data?.data,
    }),
  })

  useEffect(() => {
    cryptoBankList &&
      cryptoBankList.length !== 0 &&
      setWithdrawalOptions([PAYMENT_METHOD.LOCAL_BANK, PAYMENT_METHOD.CRYPTO])
  }, [cryptoBankList])

  const handlePress = (id) => {
    switch (id) {
      case DepositMethodId.LOCAL_BANK:
        push(`/withdrawal/bank-withdrawal`)
        break
      case DepositMethodId.CRYPTO:
        push(`/withdrawal/crypto-withdrawal`)
        break
      default:
        break
    }
  }

  return (
    <PageWithBackHeader
      header={{
        title: t('menu.withdraw'),
        actions: (
          <MenuNotice
            onPress={() =>
              openModal('NoticeModal', { notice: WITHDRAWAL_NOTES })
            }
          />
        ),
      }}
    >
      <StyledView>
        <View sx={{ p: '$pagePadding' }}>
          <AvailableBalance />
          <Text sx={{ my: 12 }}>{t('withdrawal.options')}</Text>
          <View
            sx={{
              position: 'relative',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {withdrawalOptions &&
              withdrawalOptions?.map((item, index) => (
                <DepositMethodCard
                  key={item.id}
                  item={item}
                  onPress={() => handlePress(item.id)}
                />
              ))}
          </View>
        </View>

        <WithdrawalTransactions />
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
}))

export default WithdrawalScreen
