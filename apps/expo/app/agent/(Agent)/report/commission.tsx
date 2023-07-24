import AgentCommissionScreen from 'agent/features/report/AgentCommissionReport'
import ShareholderCommissionScreen from 'agent/features/report/ShareholderCommissionReport'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ReportRoutes from 'agent/navigation/routes/ReportRoutes'
import { useUserInfoQuery } from 'agent/services/userApi'
import { useAppSelector } from 'app/provider/redux/store'

const CommissionPage = () => {
  const token = useAppSelector((s) => s.agent.access_token)
  const { isShareHolder } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      isShareHolder: data?.role === 'shareholder' ? true : false,
    }),
    skip: !token,
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
