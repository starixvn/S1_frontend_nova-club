import React from 'react'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ListRoutes from 'agent/navigation/routes/ListRoutes'
import AgentLayout from '../../../../layouts/agent/AgentLayout'
import AgentListing from 'agent/features/agent/AgentListing'

const ListAgent = () => {
  return (
    <AgentLayout>
      <>
        <AgentNestedTabs routes={ListRoutes} />
        <AgentListing />
      </>
    </AgentLayout>
  )
}

export default ListAgent
