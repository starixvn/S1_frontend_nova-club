import AddAgentPage from 'agent/features/agent/AddAgent'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import AddRoutes from 'agent/navigation/routes/AddRoutes'
import { MobileAgentLayout } from 'components/layouts/agent'

const AddAgent = () => {
  return (
    <>
      <AgentNestedTabs routes={AddRoutes} />
      <AddAgentPage />
    </>
  )
}
AddAgent.AgentLayout = MobileAgentLayout

export default AddAgent
