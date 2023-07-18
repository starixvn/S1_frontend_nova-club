import AnnouncementPage from 'agent/features/inbox/AnnouncementPage'
import PersonalMessagePage from 'agent/features/inbox/PersonalMessagePage'
import React from 'react'
import { createAgentNestedTabNavigator } from '../components/AgentNestedTabNavigator'
import InboxRoutes, { InboxRoutesParamList } from '../routes/InboxRoutes'

const Tab = createAgentNestedTabNavigator<InboxRoutesParamList>(InboxRoutes)

const AgentInboxNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Announcement" component={AnnouncementPage} />
      <Tab.Screen name="Message" component={PersonalMessagePage} />
    </Tab.Navigator>
  )
}

export default AgentInboxNavigation
