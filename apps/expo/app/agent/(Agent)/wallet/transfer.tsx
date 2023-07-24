import TransferPage from 'agent/features/wallet/transfer'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import WalletRoutes from 'agent/navigation/routes/WalletRoutes'

const Transfer = () => {
  return (
    <>
      <AgentNestedTabs routes={WalletRoutes} />
      <TransferPage />
    </>
  )
}

export default Transfer
