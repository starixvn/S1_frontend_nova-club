import React from 'react'
import AgentLayout from '../../../../layouts/agent/AgentLayout'
import WithdrawalPage from 'agent/features/wallet/withdrawal'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import WalletRoutes from 'agent/navigation/routes/WalletRoutes'

export default function Withdrawal() {
  return (
    <AgentLayout>
      <>
        <AgentNestedTabs routes={WalletRoutes} />
        <WithdrawalPage />
      </>
    </AgentLayout>
  )
}
