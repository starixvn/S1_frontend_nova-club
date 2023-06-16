import WalletLayoutContainer from 'desktop-ext/components/layout/WalletLayoutContainer'
import React from 'react'
import BankTransferScreen from 'app/features/deposit/bank-transfer'
import DepositMethodMenu from './DepositMethodMenu'

export default function DepositScreen({}) {
  return (
    // <WalletLayoutContainer leftContent={<DepositMethodMenu />}>
    <BankTransferScreen />
    // </WalletLayoutContainer>
  )
}
