import React from 'react'
import WithdrawalPage from 'agent/features/wallet/withdrawal'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import WalletRoutes from 'agent/navigation/routes/WalletRoutes'
import AgentLayout from 'components/layouts/agent/AgentLayout'

const Withdrawal = () => {
  return (
    <>
      <AgentNestedTabs routes={WalletRoutes} />
      <WithdrawalPage />
    </>
  )
}

Withdrawal.getLayout = AgentLayout

export default Withdrawal
