import TransferPage from 'agent/features/wallet/transfer'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import WalletRoutes from 'agent/navigation/routes/WalletRoutes'
import { MobileAgentLayout } from 'components/layouts/agent'

const Transfer = () => {
  return (
    <>
      <AgentNestedTabs routes={WalletRoutes} />
      <TransferPage />
    </>
  )
}
Transfer.AgentLayout = MobileAgentLayout

export default Transfer
