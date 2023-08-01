import React from 'react'
import AnnouncementPage from 'agent/features/inbox/AnnouncementPage'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import InboxRoutes from 'agent/navigation/routes/InboxRoutes'
import AgentLayout from '../../../layouts/agent/AgentLayout'

const Announcement = () => {
  return (
    <>
      <AgentNestedTabs routes={InboxRoutes} />
      <AnnouncementPage />
    </>
  )
}
Announcement.getLayout = AgentLayout

export default Announcement
