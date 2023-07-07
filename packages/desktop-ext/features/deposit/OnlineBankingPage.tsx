import OnlineBankingContent from 'app/features/deposit/online-banking/OnlineBankingContent'
import DesktopPageContainer from 'desktop-ext/components/layout/DesktopPage'
import React from 'react'

export default function DepositScreen({}) {
  return (
    <DesktopPageContainer>
      <OnlineBankingContent />
    </DesktopPageContainer>
  )
}
