import TransactionScreen from 'agent/features/report/Transaction'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ReportRoutes from 'agent/navigation/routes/ReportRoutes'

const TransactionPage = () => {
  return (
    <>
      <AgentNestedTabs routes={ReportRoutes} />
      <TransactionScreen />
    </>
  )
}

export default TransactionPage
