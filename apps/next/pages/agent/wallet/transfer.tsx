import React from 'react'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import WalletRoutes from 'agent/navigation/routes/WalletRoutes'
import AgentLayout from '../../../layouts/agent/AgentLayout'
import TransferPage from 'agent/features/wallet/transfer'

const Transfer = () => {
  return (
    <AgentLayout>
      <>
        <AgentNestedTabs routes={WalletRoutes} />
        <TransferPage />
      </>
    </AgentLayout>
  )
}

export default Transfer
