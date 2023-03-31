import AddAgent from 'agent/features/agent/AddAgent'
import AddShareholder from 'agent/features/shareholder/AddShareholder'
import { ShareholderAgent } from 'agent/features/shareholder/components/CreateForm'
import React from 'react'
import { createAgentNestedTabNavigator } from '../components/AgentNestedTabNavigator'
import AddRoutes, { AddRoutesParamList } from '../routes/AddRoutes'

const Tab = createAgentNestedTabNavigator<AddRoutesParamList>(AddRoutes)

const AddAgentShareholderNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AddShareholder"
        component={AddShareholder}
        initialParams={{ screen: ShareholderAgent.Shareholder }}
      />
      <Tab.Screen
        name="AddAgent"
        component={AddAgent}
        initialParams={{ screen: ShareholderAgent.Shareholder }}
      />
    </Tab.Navigator>
  )
}

export default AddAgentShareholderNavigation
