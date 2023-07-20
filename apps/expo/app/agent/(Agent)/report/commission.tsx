import AgentCommissionScreen from 'agent/features/report/AgentCommissionReport'
import ShareholderCommissionScreen from 'agent/features/report/ShareholderCommissionReport'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ReportRoutes from 'agent/navigation/routes/ReportRoutes'
import { useUserInfoQuery } from 'agent/services/userApi'

const CommissionPage = () => {
  const { isShareHolder } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      isShareHolder: data?.role === 'shareholder' ? true : false,
    }),
  })

  return (
    <>
      <AgentNestedTabs routes={ReportRoutes} />
      {isShareHolder ? (
        <ShareholderCommissionScreen />
      ) : (
        <AgentCommissionScreen />
      )}
    </>
  )
}

export default CommissionPage
