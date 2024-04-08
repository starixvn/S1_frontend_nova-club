import { PageWithBackHeader } from 'app/components/layouts/Page'
import MenuNotice from 'app/components/navigation/MenuNotice'
import useLocalization from 'app/provider/localization'
import { View, styled } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import { useGetAvailableWithdrawalAmountQuery } from 'services/withdrawal'
import { ReportCommonStatus, WITHDRAWAL_NOTES } from 'utils/constant'
import DailyMax from '../deposit/component/DailyMax'
import AvailableBalance from './components/AvailableBalance'
import WithdrawalForm from './components/WithdrawalForm'
import WithdrawalTransactions from './components/WithdrawalTransactions'

const BankWithdrawalScreen = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  const { data: availAmount } = useGetAvailableWithdrawalAmountQuery()

  return (
    <PageWithBackHeader
      header={{
        title: t('menu.bankWithdrawal'),
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
        <AvailableBalance />

        <DailyMax
          type="withdrawal"
          amount={availAmount?.current}
          dailyMax={availAmount?.max}
          sx={{ mb: '$3' }}
        />
        <WithdrawalForm isCrypto={false} />
      </StyledView>
      <WithdrawalTransactions
        status={ReportCommonStatus.PENDING}
        withdrawalType={WITHDRAWAL_TYPE.BANK}
      />
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  p: '$pagePadding',
}))

export default BankWithdrawalScreen
