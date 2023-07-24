import AddAgentPage from 'agent/features/agent/AddAgent'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import AddRoutes from 'agent/navigation/routes/AddRoutes'

const AddAgent = () => {
  return (
    <>
      <AgentNestedTabs routes={AddRoutes} />
      <AddAgentPage />
    </>
  )
}

export default AddAgent
