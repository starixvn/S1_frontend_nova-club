import { NoticeContent } from 'app/components/modal/NoticeModal'
import { WITHDRAWAL_NOTES } from 'app/utils/constant'
import WalletLayoutContainer from 'desktop-ext/components/layout/WalletLayoutContainer'
import React from 'react'
import WithdrawalMenu from './WithdrawalMenu'
import BankWithdrawalScreen from 'app/features/withdrawal/BankWithdrawalScreen'

const BankWithdrawalPage = () => {
  return (
    // <WalletLayoutContainer
    //   leftContent={
    //     <>
    //       <WithdrawalMenu />
    //       <NoticeContent notice={WITHDRAWAL_NOTES} />
    //     </>
    //   }
    // >
    <BankWithdrawalScreen />
    // </WalletLayoutContainer>
  )
}

export default BankWithdrawalPage
