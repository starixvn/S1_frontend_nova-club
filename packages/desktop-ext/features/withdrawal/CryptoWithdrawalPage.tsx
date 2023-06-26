import { RadioButtonProps } from 'app/components/form/RadioButton'
import AvailableBalance from 'app/features/withdrawal/components/AvailableBalance'
import WithdrawalTransactions from 'app/features/withdrawal/components/WithdrawalTransactions'
import { ReportCommonStatus } from 'app/utils/constant'
import DesktopPage from 'desktop-ext/components/layout/DesktopPage'
import { View, styled } from 'dripsy'
import React from 'react'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import DesktopCryptoWithdrawalForm from './components/DesktopCryptoWithdrawalForm'

type RadioButton = RadioButtonProps & {
  minMax: { min: number; max: number }
}
const CryptoWithdrawalPage = () => {
  return (
    <DesktopPage>
      <StyledView>
        <AvailableBalance />

        <DesktopCryptoWithdrawalForm />
      </StyledView>
      <WithdrawalTransactions
        status={ReportCommonStatus.PENDING}
        withdrawalType={WITHDRAWAL_TYPE.CRYPTO}
      />
    </DesktopPage>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  p: '$pagePadding',
}))

export default CryptoWithdrawalPage
