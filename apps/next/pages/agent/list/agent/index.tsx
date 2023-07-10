import React from 'react'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ListRoutes from 'agent/navigation/routes/ListRoutes'
import AgentLayout from 'components/layouts/agent/AgentLayout'
import AgentListing from 'agent/features/agent/AgentListing'

const ListAgent = () => {
  return (
    <>
      <AgentNestedTabs routes={ListRoutes} />
      <AgentListing />
    </>
  )
}
ListAgent.getLayout = AgentLayout

export default ListAgent
