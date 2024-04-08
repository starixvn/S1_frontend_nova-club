import FormContainer from 'app/components/form/FormContainer'
import DailyMax from 'app/features/deposit/component/DailyMax'
import AvailableBalance from 'app/features/withdrawal/components/AvailableBalance'
import WithdrawalTransactions from 'app/features/withdrawal/components/WithdrawalTransactions'
import { View, styled } from 'dripsy'
import React from 'react'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import { useGetAvailableWithdrawalAmountQuery } from 'services/withdrawal'
import { ReportCommonStatus } from 'utils/constant'
import DesktopCryptoWithdrawalForm from './components/DesktopCryptoWithdrawalForm'

const CryptoWithdrawalPage = () => {
  const { data: availAmount } = useGetAvailableWithdrawalAmountQuery()

  return (
    <FormContainer>
      <StyledView>
        <DailyMax
          type="withdrawal"
          amount={availAmount?.current}
          dailyMax={availAmount?.max}
        />
        <AvailableBalance />

        <DesktopCryptoWithdrawalForm />
      </StyledView>
      <WithdrawalTransactions
        status={ReportCommonStatus.PENDING}
        withdrawalType={WITHDRAWAL_TYPE.CRYPTO}
      />
    </FormContainer>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
}))

export default CryptoWithdrawalPage
