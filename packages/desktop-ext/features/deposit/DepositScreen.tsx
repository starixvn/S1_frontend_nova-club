import BankTransferContent from 'app/features/deposit/bank-transfer/BankTransferContent'
import DesktopPageContainer from 'desktop-ext/components/layout/DesktopPage'
import React from 'react'

export default function DepositScreen({}) {
  return (
    // <WalletLayoutContainer leftContent={<DepositMethodMenu />}>
    <DesktopPageContainer>
      <BankTransferContent />
    </DesktopPageContainer>
    // </WalletLayoutContainer>
  )
}
