import React from 'react'
import AddShareholderPage from 'agent/features/shareholder/AddShareholder'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import AddRoutes from 'agent/navigation/routes/AddRoutes'
import AgentLayout from 'components/layouts/agent/AgentLayout'

const AddShareholder = () => {
  return (
    <>
      <AgentNestedTabs routes={AddRoutes} />
      <AddShareholderPage />
    </>
  )
}

AddShareholder.getLayout = AgentLayout

export default AddShareholder
