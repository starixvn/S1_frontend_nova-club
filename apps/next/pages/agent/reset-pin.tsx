import React from 'react'
import AgentResetPin from 'agent/features/pin/AgentResetPin'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import AddRoutes from 'agent/navigation/routes/AddRoutes'
import AgentLayout from '../../layouts/agent/AgentLayout'
import AgentStackLayout from '../../layouts/agent/AgentStackLayout'

const ResetPin = () => {
  return (
    <AgentStackLayout>
      <>
        {/* <AgentNestedTabs routes={AddRoutes} /> */}
        <AgentResetPin />
      </>
    </AgentStackLayout>
  )
}

export default ResetPin
