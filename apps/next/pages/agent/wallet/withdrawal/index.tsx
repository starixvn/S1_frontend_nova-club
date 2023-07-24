import WithdrawalPage from 'agent/features/wallet/withdrawal'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import WalletRoutes from 'agent/navigation/routes/WalletRoutes'
import { MobileAgentLayout } from 'components/layouts/agent'

const Withdrawal = () => {
  return (
    <>
      <AgentNestedTabs routes={WalletRoutes} />
      <WithdrawalPage />
    </>
  )
}

Withdrawal.AgentLayout = MobileAgentLayout

export default Withdrawal
