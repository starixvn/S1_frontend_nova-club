import FormContainer from 'app/components/form/FormContainer'
import AvailableBalance from 'app/features/withdrawal/components/AvailableBalance'
import WithdrawalTransactions from 'app/features/withdrawal/components/WithdrawalTransactions'
import { ReportCommonStatus } from 'utils/constant'
import { View, styled } from 'dripsy'
import React from 'react'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import DesktopWithdrawalForm from './components/DesktopWithdrawalForm'

const BankWithdrawalPage = () => {
  return (
    <FormContainer>
      <StyledView>
        <AvailableBalance />
        <DesktopWithdrawalForm />
      </StyledView>
      <WithdrawalTransactions
        status={ReportCommonStatus.PENDING}
        withdrawalType={WITHDRAWAL_TYPE.BANK}
      />
    </FormContainer>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
}))

export default BankWithdrawalPage
