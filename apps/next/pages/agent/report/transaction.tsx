import React from 'react'
import AgentLayout from 'components/layouts/agent/AgentLayout'
import ReportRoutes from 'agent/navigation/routes/ReportRoutes'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import TransactionScreen from 'agent/features/report/Transaction'

const TransactionPage = () => {
  return (
    <>
      <AgentNestedTabs routes={ReportRoutes} />
      <TransactionScreen />
    </>
  )
}
TransactionPage.getLayout = AgentLayout

export default TransactionPage
