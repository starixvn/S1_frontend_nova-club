import WithdrawalCard from 'app/components/DepositMethodCard'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import MenuNotice from 'app/components/navigation/MenuNotice'
import { DepositMethodId } from 'app/config/deposit'
import { Route } from 'app/navigation/type'
import useLocalization from 'app/provider/localization'
import withdrawalRoutes from 'app/routes/withdrawalRoutes'
import { Text, View, styled } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useCryptoBankQuery } from 'services/bank'
import { useGetAvailableWithdrawalAmountQuery } from 'services/withdrawal'
import { useRouter } from 'solito/router'
import { WITHDRAWAL_NOTES } from 'utils/constant'
import DailyMax from '../deposit/component/DailyMax'
import AvailableBalance from './components/AvailableBalance'
import WithdrawalTransactions from './components/WithdrawalTransactions'

const WithdrawalScreen = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { openModal } = useModal()

  const [withdrawalOptions, setWithdrawalOptions] = useState([
    withdrawalRoutes[0] as Route,
  ])

  const { isCryptoAvailable } = useCryptoBankQuery(undefined, {
    selectFromResult: (s) => {
      return { ...s, isCryptoAvailable: s.data && s.data.length > 0 }
    },
  })
  const { data: availAmount } = useGetAvailableWithdrawalAmountQuery()

  useEffect(() => {
    if (isCryptoAvailable) setWithdrawalOptions([...withdrawalRoutes])
  }, [isCryptoAvailable])

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
          <DailyMax
            type="withdrawal"
            amount={availAmount?.current}
            dailyMax={availAmount?.max}
            sx={{ py: '$0' }}
          />

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
                <WithdrawalCard
                  key={item.key}
                  name={item.title}
                  icon={item.icon ?? 'bank'}
                  onPress={() => push(item.route)}
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
