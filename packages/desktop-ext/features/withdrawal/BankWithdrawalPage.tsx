import WithdrawalTransactions from 'app/features/withdrawal/components/WithdrawalTransactions'
import { ReportCommonStatus } from 'app/utils/constant'
import DesktopPage from 'desktop-ext/components/layout/DesktopPage'
import { View, styled } from 'dripsy'
import React from 'react'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import DesktopWithdrawalForm from './components/DesktopWithdrawalForm'
import AvailableBalance from 'app/features/withdrawal/components/AvailableBalance'

const BankWithdrawalPage = () => {
  return (
    <DesktopPage>
      <StyledView>
        <AvailableBalance />
        <DesktopWithdrawalForm isCrypto={false} />
      </StyledView>
      <WithdrawalTransactions
        status={ReportCommonStatus.PENDING}
        withdrawalType={WITHDRAWAL_TYPE.BANK}
      />
    </DesktopPage>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  p: '$pagePadding',
}))

export default BankWithdrawalPage
