import WithdrawalPage from 'agent/features/wallet/withdrawal'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import WalletRoutes from 'agent/navigation/routes/WalletRoutes'

const Withdrawal = () => {
  return (
    <>
      <AgentNestedTabs routes={WalletRoutes} />
      <WithdrawalPage />
    </>
  )
}

export default Withdrawal
