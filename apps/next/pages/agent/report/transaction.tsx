import React from 'react'
import AgentLayout from '../../../layouts/agent/AgentLayout'
import ReportRoutes from 'agent/navigation/routes/ReportRoutes'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import TransactionScreen from 'agent/features/report/Transaction'

const TransactionPage = () => {
  return (
    <AgentLayout>
      <>
        <AgentNestedTabs routes={ReportRoutes} />
        <TransactionScreen />
      </>
    </AgentLayout>
  )
}

export default TransactionPage
