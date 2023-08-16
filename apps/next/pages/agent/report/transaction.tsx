import TransactionScreen from 'agent/features/report/Transaction'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ReportRoutes from 'agent/navigation/routes/ReportRoutes'
import { MobileAgentLayout } from 'components/layouts/agent'

const TransactionPage = () => {
  return (
    <>
      <AgentNestedTabs routes={ReportRoutes} />
      <TransactionScreen />
    </>
  )
}
TransactionPage.AgentLayout = MobileAgentLayout

export default TransactionPage
