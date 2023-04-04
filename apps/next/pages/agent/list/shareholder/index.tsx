import React from 'react'
import ShareholderListing from 'agent/features/shareholder/ShareholderListing'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ListRoutes from 'agent/navigation/routes/ListRoutes'
import AgentLayout from '../../../../layouts/agent/AgentLayout'

const ListShareholder = () => {
  return (
    <AgentLayout>
      <>
        <AgentNestedTabs routes={ListRoutes} />
        <ShareholderListing />
      </>
    </AgentLayout>
  )
}

export default ListShareholder
