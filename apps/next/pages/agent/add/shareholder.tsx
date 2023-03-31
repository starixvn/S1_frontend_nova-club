import React from 'react'
import AgentLayout from '../../../layouts/agent/AgentLayout'
import AddShareholderPage from 'agent/features/shareholder/AddShareholder'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import AddRoutes from 'agent/navigation/routes/AddRoutes'

const AddShareholder = () => {
  return (
    <AgentLayout>
      <>
        <AgentNestedTabs routes={AddRoutes} />
        <AddShareholderPage />
      </>
    </AgentLayout>
  )
}

export default AddShareholder
