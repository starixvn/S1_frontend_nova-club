import AgentListing from 'agent/features/agent/AgentListing'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ListRoutes from 'agent/navigation/routes/ListRoutes'

const ListAgent = () => {
  return (
    <>
      <AgentNestedTabs routes={ListRoutes} />
      <AgentListing />
    </>
  )
}

export default ListAgent
