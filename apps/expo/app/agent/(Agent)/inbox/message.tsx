import PersonalMessagePage from 'agent/features/inbox/PersonalMessagePage'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import InboxRoutes from 'agent/navigation/routes/InboxRoutes'

const Message = () => {
  return (
    <>
      <AgentNestedTabs routes={InboxRoutes} />
      <PersonalMessagePage />
    </>
  )
}

export default Message
