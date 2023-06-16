import { NoticeContent } from 'app/components/modal/NoticeModal'
import { WITHDRAWAL_NOTES } from 'app/utils/constant'
import WalletLayoutContainer from 'desktop-ext/components/layout/WalletLayoutContainer'
import React from 'react'
import WithdrawalMenu from './WithdrawalMenu'
import BankWithdrawalScreen from 'app/features/withdrawal/BankWithdrawalScreen'
import CryptoWithdrawalScreen from 'app/features/withdrawal/CryptoWithdrawalScreen'

const CryptoWithdrawalPage = () => {
  return (
    // <WalletLayoutContainer
    //   leftContent={
    //     <>
    //       <WithdrawalMenu />
    //       <NoticeContent notice={WITHDRAWAL_NOTES} />
    //     </>
    //   }
    // >
    <CryptoWithdrawalScreen />
    // </WalletLayoutContainer>
  )
}

export default CryptoWithdrawalPage
