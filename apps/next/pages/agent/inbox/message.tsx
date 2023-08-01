import PersonalMessagePage from 'agent/features/inbox/PersonalMessagePage'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import InboxRoutes from 'agent/navigation/routes/InboxRoutes'
import { MobileAgentLayout } from 'components/layouts/agent'

const Message = () => {
  return (
    <>
      <AgentNestedTabs routes={InboxRoutes} />
      <PersonalMessagePage />
    </>
  )
}

Message.AgentLayout = MobileAgentLayout

export default Message
