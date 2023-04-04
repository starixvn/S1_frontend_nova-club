import React from 'react'
import AgentLayout from '../../../layouts/agent/AgentLayout'
import ReportRoutes from 'agent/navigation/routes/ReportRoutes'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import AgentCommissionScreen from 'agent/features/report/AgentCommissionReport'
import ShareholderCommissionScreen from 'agent/features/report/ShareholderCommissionReport'
import { useUserInfoQuery } from 'agent/services/userApi'

const CommissionPage = () => {
  const { isShareHolder } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      isShareHolder: data?.role === 'shareholder' ? true : false,
    }),
  })

  return (
    <AgentLayout>
      <>
        <AgentNestedTabs routes={ReportRoutes} />
        {isShareHolder ? (
          <ShareholderCommissionScreen />
        ) : (
          <AgentCommissionScreen />
        )}
      </>
    </AgentLayout>
  )
}

export default CommissionPage
