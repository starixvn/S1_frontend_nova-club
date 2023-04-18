import React from 'react'
import AgentLayout from '../../../layouts/agent/AgentLayout'
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
AddAgent.getLayout = AgentLayout

export default AddAgent
