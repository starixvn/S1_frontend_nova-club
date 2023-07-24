import AgentResetPassword from 'agent/features/auth/AgentResetPassword'
import { MobileStackAgentLayout } from 'components/layouts/agent'

const ResetPassword = () => {
  return <AgentResetPassword />
}

ResetPassword.AgentLayout = MobileStackAgentLayout

export default ResetPassword
