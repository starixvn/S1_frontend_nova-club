import AgentListing from 'agent/features/agent/AgentListing'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ListRoutes from 'agent/navigation/routes/ListRoutes'
import { MobileAgentLayout } from 'components/layouts/agent'

const ListAgent = () => {
  return (
    <>
      <AgentNestedTabs routes={ListRoutes} />
      <AgentListing />
    </>
  )
}
ListAgent.AgentLayout = MobileAgentLayout

export default ListAgent
