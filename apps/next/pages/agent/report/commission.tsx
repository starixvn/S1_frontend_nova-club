import AgentCommissionScreen from 'agent/features/report/AgentCommissionReport'
import ShareholderCommissionScreen from 'agent/features/report/ShareholderCommissionReport'
import PartnerCommissionScreen from 'agent/features/report/PartnerCommissionReport'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ReportRoutes from 'agent/navigation/routes/ReportRoutes'
import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import { MobileAgentLayout } from 'components/layouts/agent'

const CommissionPage = () => {
  const { role } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      role: data?.role,
    }),
  })

  return (
    <>
      <AgentNestedTabs routes={ReportRoutes} />
      {role === ROLE.AGENT ? (
        <AgentCommissionScreen />
      ) : role === ROLE.SHAREHOLDER ? (
        <ShareholderCommissionScreen />
      ) : null
      // <PartnerCommissionScreen />
      }
    </>
  )
}

CommissionPage.AgentLayout = MobileAgentLayout

export default CommissionPage
