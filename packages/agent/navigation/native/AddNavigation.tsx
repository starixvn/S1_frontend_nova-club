import AddAgent from 'agent/features/agent/AddAgent'
import AddShareholder from 'agent/features/shareholder/AddShareholder'
import React from 'react'
import { createAgentNestedTabNavigator } from '../components/AgentNestedTabNavigator'
import AddRoutes, { AddRoutesParamList } from '../routes/AddRoutes'

const Tab = createAgentNestedTabNavigator<AddRoutesParamList>(AddRoutes)

const AddNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AddShareholder" component={AddShareholder} />
      <Tab.Screen name="AddAgent" component={AddAgent} />
    </Tab.Navigator>
  )
}

export default AddNavigation
