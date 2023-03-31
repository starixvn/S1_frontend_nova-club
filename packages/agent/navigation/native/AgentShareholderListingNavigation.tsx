import AgentListing from 'agent/features/agent/AgentListing'
import ShareholderListing from 'agent/features/shareholder/ShareholderListing'
import React from 'react'
import { createAgentNestedTabNavigator } from '../components/AgentNestedTabNavigator'
import ListRoutes, { ListRoutesParamList } from '../routes/ListRoutes'

const Tab = createAgentNestedTabNavigator<ListRoutesParamList>(ListRoutes)

const AgentShareholderListingNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="ListShareholder" component={ShareholderListing} />
      <Tab.Screen name="ListAgent" component={AgentListing} />
    </Tab.Navigator>
  )
}

export default AgentShareholderListingNavigation
