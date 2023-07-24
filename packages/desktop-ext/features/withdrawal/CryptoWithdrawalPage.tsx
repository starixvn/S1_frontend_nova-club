import FormContainer from 'app/components/form/FormContainer'
import AvailableBalance from 'app/features/withdrawal/components/AvailableBalance'
import WithdrawalTransactions from 'app/features/withdrawal/components/WithdrawalTransactions'
import { ReportCommonStatus } from 'app/utils/constant'
import { View, styled } from 'dripsy'
import React from 'react'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import DesktopCryptoWithdrawalForm from './components/DesktopCryptoWithdrawalForm'

const CryptoWithdrawalPage = () => {
  return (
    <FormContainer>
      <StyledView>
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
